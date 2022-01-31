import * as Yup from 'yup';

const validatorReg = (required, minMaxLogin, minMaxPass, confirmErr) => {
  const schema = Yup.object().shape({
    login: Yup.string()
      .trim()
      .min(3, minMaxLogin)
      .max(20, minMaxLogin)
      .required(required),
    password: Yup.string()
      .trim()
      .min(6, minMaxPass)
      .required(required),
    confirmpassword: Yup.string()
      .trim()
      .oneOf([Yup.ref('password')], confirmErr)
      .required(required),
  });
  return schema;
};

export default validatorReg;
