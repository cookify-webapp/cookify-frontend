import * as Yup from 'yup'
import _ from 'lodash'

export const IngredientValidateSchema = Yup.object().shape({
  name: Yup.string().required('กรุณากรอกชื่อวัตถุดิบภาษาไทย'),
  queryKey: Yup.string().required('กรุณากรอกชื่อวัตถุดิบภาษาอังกฤษ'),
  unit: Yup.string().required('กรุณาเลือกหน่วยของวัตถุดิบ'),
  type: Yup.string().required('กรุณาเลือกประเภทของวัตถุดิบ'),
  shopUrl: Yup.string().notRequired(),
  imageFileName: Yup.string().required('กรุณาเพิ่มรูปภ่าพ')
})

//-----------------
// INITIAL VALUE
//-----------------
export const ingredientInitialValues = (value?: any) => {
  if (value) {
    return {
      name: value.name,
      queryKey: value.queryKey,
      unit: value.unit?._id,
      type: value.type?._id,
      shopUrl: value.shopUrl,
      imageFileName: value.image,
      ingredientImage: null
    }
  }
  return {
    name: "",
    queryKey: "",
    unit: "",
    type: "",
    shopUrl: "",
    imageFileName: "",
    ingredientImage: Object
  }
}

//-------------------
//  FORM DATA
//-------------------
export const createIngredientFormData = (value) => {
  const formData = new FormData()
  let data = {
    name: value.name,
    queryKey: value.queryKey,
    unit: value.unit,
    type: value.type,
    shopUrl: value.shopUrl
  }

  formData.append('data', JSON.stringify(data))
  if (value.ingredientImage !== null) {
    formData.append('ingredientImage', value.ingredientImage, value.imageFileName)
  }

  return formData
}