import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Link, useLocation, useNavigate,
} from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import imgFormLogin from '../../picture/label2.png';
import schema from '../../validator/index.js';
import useFormikCustom from '../../hooks/useFormikCustom.jsx';
import routes from '../../routes.js';
import useAuth from '../../hooks/useAuth.jsx';

const LoginPage = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const input = useRef();
  useEffect(() => {
    input.current.focus();
  }, []);
  const initialValues = {
    login: '',
    password: '',
  };

  const submitHandler = async (values, { setErrors }) => {
    try {
      const { login, password } = values;
      const path = routes.loginPath();
      const { data } = await axios.post(path, {
        username: login,
        password,
      });
      auth.logIn();
      localStorage.setItem('userId', JSON.stringify({ token: data.token }));
      navigate('/', { from: location });
    } catch (e) {
      setErrors({ login: 'Неверное имя пользователя', password: 'Неверный пароль' });
    }
  };
  const formik = useFormikCustom(initialValues, submitHandler, schema.schemaLogin);
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
              <img src={imgFormLogin} className="rounded-circle" alt="" width="250" height="200" />
            </div>
            <div className="d-flex flex-column align-items-center">
              <h2 className="text-center mb-4">Войти</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="login">
                  <Form.Label>Ваш ник</Form.Label>
                  <Form.Control
                    type="text"
                    ref={input}
                    placeholder="Ваш ник"
                    autoComplete="login"
                    name="login"
                    isInvalid={errors.login}
                    onChange={handleChange}
                    value={values.login}
                  />
                  <Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    autoComplete="current-password"
                    isInvalid={errors.password}
                    onChange={handleChange}
                    value={values.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox" />
                <Button className="w-100" variant="primary" type="submit" disabled={isSubmitting}>
                  Войти
                </Button>
              </Form>
            </div>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <Link to="/registration/">Регистрация</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
