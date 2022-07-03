import * as Yup from 'yup'
import _ from 'lodash'

export const commentValidateSchema = Yup.object().shape({
  rating: Yup.number().required().moreThan(0),
  comment: Yup.string().required()
})