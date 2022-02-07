import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import {
  Form, Modal, Button, Container,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import useFormikCustom from '../../hooks/useFormikCustom.jsx';
import { addChannel, changeCannel, selectorsChannels } from '../../slices/chennelReducer.js';
import { addChannelShow } from '../../slices/modalReducer.js';

const AddChannel = (props) => {
  const { addChannelModalState } = useSelector((state) => state.modal);
  const { socket } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.select();
  }, [addChannelModalState]);
  const initialValues = {
    channel: '',
  };
  const channelsNames = useSelector(selectorsChannels.selectAll)
    .map(({ name }) => name);
  const validationSchema = Yup.object({
    channel: Yup.string().notOneOf(channelsNames, t('modal.err.uniq'))
      .trim()
      .required(t('modal.err.require'))
      .min(3, t('modal.err.minMax'))
      .max(20, t('modal.err.minMax')),
  });
  const submitHandler = (values, { resetForm, setErrors, setFieldValue }) => {
    const dataChannel = { name: values.channel, removable: true };
    const req = () => {
      socket.emit('newChannel', dataChannel, (response) => {
        if (response.status === 'ok') {
          const { data } = response;
          const channel = data;
          const { id } = data;
          dispatch(addChannel({ channel }));
          dispatch(changeCannel({ id }));
          toast.success(t('toast.add'));
          resetForm();
        }
      });
    };
    if (socket.connected) {
      req();
    } else {
      toast.error(t('toast.connectionErr'));
      dispatch(addChannelShow());
      setFieldValue('channel', values.channel);
      setErrors({ channel: t('modal.err.network') });
      inputRef.current.focus();
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
    dispatch(addChannelShow());
  };
  const handlerOnHide = () => {
    dispatch(addChannelShow());
    resetForm();
  };
  return (
    <Modal
      show={addChannelModalState}
      onHide={handlerOnHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="channel">
            <Form.Control
              type="text"
              ref={inputRef}
              autoComplete="channel"
              name="channel"
              isInvalid={errors.channel}
              onChange={handleChange}
              value={values.channel}
            />
            <Form.Control.Feedback type="invalid">{errors.channel}</Form.Control.Feedback>
          </Form.Group>
          <Container className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={handlerOnHide}>
              {t('modal.button.close')}
            </Button>
            <Button variant="primary" type="submit" disabled={!isValid || !values.channel} onClick={handlerShow}>
              {t('modal.button.save')}
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
