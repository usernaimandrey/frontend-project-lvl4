import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import {
  Form, Modal, Button, Container,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import useFormikCustom from '../../hooks/useFormikCustom.jsx';
import { selectorsChannels } from '../../slices/chennelReducer.js';
import { renameChannelShow } from '../../slices/modalReducer.js';
import useSocket from '../../hooks/useSocket.jsx';

const RenameChannel = () => {
  const socket = useSocket();
  const { renameModalState } = useSelector((state) => state.modal);
  const { renameId } = useSelector((state) => state.modal);
  const { renameChannelName } = useSelector((state) => state.modal);
  const nameInit = !renameChannelName ? '' : renameChannelName;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRefRename = useRef();
  useEffect(() => {
    inputRefRename.current?.select();
  }, [renameModalState]);
  const initialValues = {
    value: nameInit,
  };
  const channelsNames = useSelector(selectorsChannels.selectAll)
    .map(({ name }) => name);
  const validationSchema = Yup.object({
    value: Yup.string().notOneOf(channelsNames, t('modal.err.uniq'))
      .trim()
      .required(t('modal.err.require'))
      .min(3, t('modal.err.minMax'))
      .max(20, t('modal.err.minMax')),
  });
  const submitHandler = (values, { resetForm, setErrors, setFieldValue }) => {
    const dataChannel = { name: values.value, id: renameId };
    const req = () => {
      socket.emit('renameChannel', dataChannel, (response) => {
        if (response.status === 'ok') {
          toast.success(t('toast.rename'));
          resetForm();
        }
      });
    };
    if (socket.connected) {
      req();
    } else {
      toast.error(t('toast.connectionErr'));
      dispatch(renameChannelShow());
      setFieldValue('channel', values.channel);
      setErrors({ channel: t('modal.err.network') });
      inputRefRename.current.focus();
    }
  };
  const formik = useFormikCustom(initialValues, submitHandler, validationSchema);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    resetForm,
  } = formik;
  const handlerShow = () => {
    dispatch(renameChannelShow());
  };
  const handlerOnHide = () => {
    dispatch(renameChannelShow());
    resetForm();
  };
  return (
    <Modal
      show={renameModalState}
      onHide={handlerOnHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="channel">
            <Form.Control
              type="text"
              ref={inputRefRename}
              autoComplete="value"
              name="value"
              isInvalid={errors.value}
              onChange={handleChange}
              value={values.value}
            />
            <Form.Label visuallyHidden>{t('modal.label')}</Form.Label>
            <Form.Control.Feedback type="invalid">{errors.value}</Form.Control.Feedback>
          </Form.Group>
          <Container className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={handlerOnHide}>
              {t('modal.button.close')}
            </Button>
            <Button variant="primary" type="submit" disabled={!isValid || !values.value} onClick={handlerShow}>
              {t('modal.button.save')}
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
