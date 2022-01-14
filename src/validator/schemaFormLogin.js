import * as Yup from 'yup';

const schema = Yup.object().shape({
  login: Yup.string()
    .trim()
    .required('Поле обязателно к заполнению'),
  password: Yup.string()
    .trim()
    .required('Поле обязателно к заполнению'),
});

export default schema;
