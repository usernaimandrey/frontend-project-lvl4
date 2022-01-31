import React, { useRef, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import siginup from '../../picture/siginup.png';
import useFormikCustom from '../../hooks/useFormikCustom.jsx';
import schema from '../../validator/index.js';

const RegistrationForm = () => {
  const input = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    input.current.focus();
  }, []);
  const initialValues = {
    login: '',
    password: '',
    confirmpassword: '',
  };
  const submitHandler = () => console.log('yeee!!');
  const validationSchema = schema.schemaRegistrarion(t('signUpForm.validErr.req'), t('signUpForm.validErr.minMaxLog'), t('signUpForm.validErr.minPass'), t('signUpForm.validErr.confirm'));
  const formik = useFormikCustom(initialValues, submitHandler, validationSchema);
  const {
    isSubmitting,
    handleSubmit,
    handleChange,
    values,
    errors,
  } = formik;
  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body d-flex p-5 justify-content-sm-around align-items-center">
            <div>
              <img src={siginup} className="rounded-circle" alt="Зарегится)" width="250" height="200" />
            </div>
            <div className="d-flex flex-column align-items-center">
              <h2 className="text-center mb-4">{t('signUpForm.header')}</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="login">
                  <Form.Label>{t('signUpForm.name')}</Form.Label>
                  <Form.Control
                    type="text"
                    ref={input}
                    placeholder={t('signUpForm.name')}
                    autoComplete="login"
                    name="login"
                    isInvalid={errors.login}
                    onChange={handleChange}
                    value={values.login}
                  />
                  <Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>{t('signUpForm.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('signUpForm.password')}
                    name="password"
                    autoComplete="password"
                    isInvalid={errors.password}
                    onChange={handleChange}
                    value={values.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmpassword">
                  <Form.Label>{t('signUpForm.confirmPass')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('signUpForm.confirmPass')}
                    autoComplete="confirmpassword"
                    name="confirmpassword"
                    isInvalid={errors.confirmpassword}
                    onChange={handleChange}
                    value={values.confirmpassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.confirmpassword}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox" />
                <Button className="w-100" variant="primary" type="submit" disabled={isSubmitting}>
                  {t('signUpForm.button')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
