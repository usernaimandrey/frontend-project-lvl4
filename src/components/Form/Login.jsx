import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import imgFormLogin from '../../picture/label2.png';
import schema from '../../validator/index.js';

const LoginPage = () => {
  const input = useRef();
  useEffect(() => {
    input.current.focus();
  }, []);
  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5 justify-content-sm-between align-items-center">
            <div>
              <img src={imgFormLogin} className="rounded-circle" alt="" width="200" height="150" />
            </div>
            <div className="d-flex flex-column align-items-center">
              <h2 className="text-center mb-4">Войти</h2>
              <Formik
                initialValues={{
                  login: '',
                  password: '',
                }}
                validationSchema={schema.schemaLogin}
                onSubmit={(values) => console.log(values)}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                    <div>
                      <div className="form-floating mb-3 form-group">
                        <Field>
                          {() => (
                            <>
                              <input
                                ref={input}
                                className="form-control"
                                type="text"
                                name="login"
                                autoComplete="login"
                                required
                                placeholder="Ваш ник"
                                value={values.login}
                                onChange={handleChange}
                              />
                            </>
                          )}
                        </Field>
                        {errors.login && touched.password ? <div className="invalid-feedback d-block">{errors.login}</div> : null}
                      </div>
                      <div className="form-floating mb-3 form-group">
                        <Field>
                          {() => (
                            <>
                              <input
                                className="form-control"
                                type="text"
                                autoComplete="password"
                                name="password"
                                required
                                placeholder="Пароль"
                                value={values.password}
                                onChange={handleChange}
                              />
                            </>
                          )}
                        </Field>
                        {errors.password && touched.password ? <div className="invalid-feedback d-block">{errors.password}</div> : null}
                      </div>
                      <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>Войти</button>
                    </div>
                  </Form>
                )}
              </Formik>
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
