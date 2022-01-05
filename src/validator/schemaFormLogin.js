import * as Yup from 'yup';

const schema = Yup.object().shape({
  login: Yup.string()
    .min(3, 'Должен содержать минимум 3 символа')
    .required('Поле обязателно к заполнению'),
  password: Yup.string().required('Поле обязателно к заполнению'),
});

export default schema;
