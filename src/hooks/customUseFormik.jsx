import { useFormik } from 'formik';

const customUseFormik = (initialValues, submitHandler, schema) => useFormik({
  initialValues,
  onSubmit: submitHandler,
  validationSchema: schema,
});

export default customUseFormik;
