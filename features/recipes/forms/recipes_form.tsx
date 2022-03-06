import * as Yup from 'yup'

// -----------------
// VALIDATION
// -----------------
export const onValidation = Yup.object().shape({
  recipeName: Yup.string().required()
})