import * as Yup from 'yup';

const validator = (text) => {
  const schema = Yup.object().shape({
    login: Yup.string()
      .trim()
      .required(text),
    password: Yup.string()
      .trim()
      .required(text),
  });
  return schema;
};

export default validator;
