import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Container, Form, Button, Col,
} from 'react-bootstrap';
import useFormikCustom from '../../hooks/useFormikCustom.jsx';
import schema from '../../validator/index.js';

const AddMessage = (props) => {
  const { userAuth } = JSON.parse(localStorage.getItem('userId'));
  const { currentChannelId } = useSelector((state) => state.channel);
  const { socket } = props;
  const { t } = useTranslation();
  const input = useRef();
  useEffect(() => {
    input.current.focus();
  }, []);
  const { schemaAddMessage } = schema;
  const initialValues = { message: '' };
  const subMitHandler = (values, { resetForm }) => {
    socket.emit('newMessage', { text: values.message, user: userAuth, channel: currentChannelId }, (response) => {
      console.log(response);
    });
    resetForm();
    input.current.focus();
  };
  const formik = useFormikCustom(initialValues, subMitHandler, schemaAddMessage);
  const {
    handleSubmit,
    handleChange,
    values,
    isValid,
  } = formik;
  return (
    <Container className="mt-auto px-5 py-3">
      <Form noValidate className="py-1" onSubmit={handleSubmit}>
        <Container className="input-group has-validation">
          <Col>
            <Form.Group className="mb-3" controlId="message">
              <Form.Control
                ref={input}
                type="text"
                placeholder={t('formMessage')}
                autoComplete="message"
                name="message"
                value={values.message}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="outline-dark" type="submit" disabled={!socket.connected || !isValid}>
              &#10149;
            </Button>
          </Col>
        </Container>
      </Form>
    </Container>
  );
};

export default AddMessage;
