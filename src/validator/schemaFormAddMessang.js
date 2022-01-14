import * as Yup from 'yup';

const schema = Yup.object().shape({
  message: Yup.string()
    .trim()
    .required(),
});

export default schema;
