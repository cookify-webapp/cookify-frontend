import * as Yup from 'yup'
import _ from 'lodash'

export const profileValidateSchema = Yup.object().shape({
  email: Yup.string().email('กรุณากรอกอีเมลให้ถูกต้อง').required('กรุณากรอกอีเมล'),
  allergy: Yup.array().of(Yup.string()).notRequired(),
  imageFileName: Yup.string().notRequired()
})