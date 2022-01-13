import { useFormik } from 'formik';

const useFormikCustom = (initialValues, submitHandler, schema) => useFormik({
  initialValues,
  onSubmit: submitHandler,
  validationSchema: schema,
});

export default useFormikCustom;
