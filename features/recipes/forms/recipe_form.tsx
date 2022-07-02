import * as Yup from 'yup'
import _ from 'lodash'

export const recipeValidateSchema = Yup.object().shape({
  name: Yup.string().required('กรุณากรอกชื่อสูตรอาหาร'),
  desc: Yup.string().required('กรุณากรอกรายละเอียดสูตรอาหาร'),
  method: Yup.string().required('กรุณาเลือกประเภท'),
  serving: Yup.number().required('กรุณากรอกจำนวนหน่วยบริโภค').moreThan(0, 'จำนวนหน่วยบริโภคต้องมากกว่า 0'),
  ingredientsId: Yup.array().of(Yup.string()).min(1),
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
      ingredientsId: value.ingredients,
      quantity: value.quantity,
      subIngredientsId: value.subIngredients,
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
    ingredientsId: [],
    quantity: [],
    subIngredientsId: [],
    steps: [""],
    imageFileName: "",
    recipeImage: Object
  }
}