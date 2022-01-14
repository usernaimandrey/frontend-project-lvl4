import { useFormik } from 'formik';

const useFormikCustom = (initialValues, submitHandler, schema = null) => useFormik({
  initialValues,
  onSubmit: submitHandler,
  validationSchema: schema,
});

export default useFormikCustom;
