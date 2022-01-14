import React, { useRef, useEffect } from 'react';
import {
  Container, Form, Button, Col,
} from 'react-bootstrap';
import useFormikCustom from '../../hooks/useFormikCustom.jsx';
import schema from '../../validator/index.js';

const AddMessage = () => {
  const input = useRef();
  useEffect(() => {
    input.current.focus();
  }, []);
  const { schemaAddMessage } = schema;
  const initialValues = { message: '' };
  const subMitHandler = (values, { resetForm }) => {
    console.log(values);
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
  const { message } = values;
  return (
    <Container className="mt-auto px-5 py-3">
      <Form noValidate className="py-1" onSubmit={handleSubmit}>
        <Container className="input-group has-validation">
          <Col>
            <Form.Group className="mb-3" controlId="message">
              <Form.Control
                ref={input}
                type="text"
                placeholder="Введите сообщение..."
                autoComplete="message"
                name="message"
                value={values.message}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button variant="outline-dark" type="submit" disabled={!message || !isValid}>
              &#10149;
            </Button>
          </Col>
        </Container>
      </Form>
    </Container>
  );
};

export default AddMessage;
