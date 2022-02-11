import React, { useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Container, Form, Button, Col,
} from 'react-bootstrap';
import filter from 'leo-profanity';
import useFormikCustom from '../../hooks/useFormikCustom.jsx';
import schema from '../../validator/index.js';

const AddMessage = (props) => {
  filter.clearList();
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('fr'));
  filter.add(filter.getDictionary('ru'));
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
  const subMitHandler = (values, { resetForm, setFieldValue }) => {
    const { message } = values;
    const filteredMessage = filter.check(message) ? filter.clean(message) : message;
    const msg = { text: filteredMessage, user: userAuth, channelId: currentChannelId };
    if (socket.connected) {
      socket.emit('newMessage', msg);
      resetForm();
      input.current.focus();
    } else {
      toast.error(t('toast.connectionErr'));
      setFieldValue('message', values.message);
      input.current.focus();
    }
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
                aria-label={t('formMessageLable')}
                placeholder={t('formMessage')}
                autoComplete="message"
                name="message"
                value={values.message}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="outline-dark" type="submit" disabled={!values.message || !isValid}>
              &#10149;
              <span className="visually-hidden">{t('formMessageSend')}</span>
            </Button>
          </Col>
        </Container>
      </Form>
    </Container>
  );
};

export default AddMessage;
