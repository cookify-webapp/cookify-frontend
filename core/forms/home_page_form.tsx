import * as Yup from 'yup'

// -----------------
// VALIDATION
// -----------------
export const onValidation = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
})