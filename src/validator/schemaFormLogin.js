import * as Yup from 'yup';

const schema = Yup.object().shape({
  login: Yup.string()
    .required('Поле обязателно к заполнению'),
  password: Yup.string()
    .required('Поле обязателно к заполнению'),
});

export default schema;
