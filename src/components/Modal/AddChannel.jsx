import React, { useEffect, useRef, useState } from 'react';
import {
  Form, Modal, Button, Container,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import useFormikCustom from '../../hooks/useFormikCustom.jsx';
import { addChannel, changeCannel, selectorsChannels } from '../../slices/chennelReducer.js';
import { setConnectionErr } from '../../slices/messagesReducer.js';

const AddChannel = (props) => {
  const [stateConnection, setState] = useState(false);
  const { show, handler, socket } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.select();
  }, [show]);
  const initialValues = {
    channel: '',
  };
  socket.on('connect_error', () => {
    setState(true);
    dispatch(setConnectionErr());
    socket.connect();
  });
  socket.on('connect', () => {
    setState(false);
  });
  const channelsNames = useSelector(selectorsChannels.selectAll)
    .map(({ name }) => name);
  const validationSchema = Yup.object({
    channel: Yup.string().notOneOf(channelsNames, t('modal.err.uniq'))
      .trim()
      .required(t('modal.err.require')),
  });
  const submitHandler = (values, { resetForm, setErrors }) => {
    const dataChannel = { name: values.channel, removable: true };
    socket.emit('newChannel', dataChannel, (response) => {
      if (response.status === 'ok') {
        const { data } = response;
        const channel = data;
        const { id } = data;
        dispatch(addChannel({ channel }));
        dispatch(changeCannel({ id }));
        resetForm();
      }
      if (stateConnection) {
        setErrors({ channel: t('modal.err.network') });
      }
    });
  };
  const formik = useFormikCustom(initialValues, submitHandler, validationSchema);
  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
  } = formik;
  return (
    <Modal
      show={show}
      onHide={handler}
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
            <Button className="me-2" variant="secondary" onClick={handler}>
              {t('modal.button.close')}
            </Button>
            <Button variant="primary" type="submit" disabled={stateConnection || !isValid || !values.channel} onClick={handler}>
              {t('modal.button.save')}
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
