import * as Yup from 'yup'
import _ from 'lodash'

export const recipeValidateSchema = Yup.object().shape({
  name: Yup.string().required('กรุณากรอกชื่อสูตรอาหาร'),
  desc: Yup.string().required('กรุณากรอกรายละเอียดสูตรอาหาร'),
  method: Yup.string().required('กรุณาเลือกประเภท'),
  serving: Yup.number().required('กรุณากรอกจำนวนหน่วยบริโภค').moreThan(0, 'จำนวนหน่วยบริโภคต้องมากกว่า 0'),
  ingredients: Yup.array().of(Yup.object().shape({
    ingredient: Yup.string(),
    quantity: Yup.number().required('กรุณากรอกจำนวนวัตถุดิบให้ครบถ้วน'),
    unit: Yup.string()
  })).required('กรุณาเลือกวัตถุดิบหลัก').min(1),
  subIngredients: Yup.array().of(Yup.string()).notRequired(),
  steps: Yup.array().of(Yup.string()).required('กรุณากรอกขั้นตอนการประกอบอาหาร'),
  imageFileName: Yup.string().required('กรุณาเพิ่มรูปภ่าพ')
})

//-----------------
// INITIAL VALUE
//-----------------
export const recipeInitialValues = (value?: any) => {
  if (value) {
    return {
      name: value.name,
      desc: value.desc,
      method: value.method?._id,
      serving: value.serving,
      ingredients: value.ingredients,
      subIngredients: value.subIngredients,
      steps: value.steps,
      imageFileName: value.image,
      recipeImage: null
    }
  }
  return {
    name: "",
    desc: "",
    method: "",
    serving: 1,
    ingredients: [],
    subIngredients: [],
    steps: [],
    imageFileName: "",
    recipeImage: Object
  }
}