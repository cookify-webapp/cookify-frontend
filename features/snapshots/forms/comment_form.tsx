import * as Yup from 'yup'
import _ from 'lodash'

export const commentValidateSchema = Yup.object().shape({
  comment: Yup.string().required()
})