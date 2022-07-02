import * as Yup from "yup";
import _ from "lodash";

export const recipeValidateSchema = Yup.object().shape({
  name: Yup.string().required("กรุณากรอกชื่อสูตรอาหาร"),
  desc: Yup.string().required("กรุณากรอกรายละเอียดสูตรอาหาร"),
  method: Yup.string().required("กรุณาเลือกประเภท"),
  serving: Yup.number()
    .required("กรุณากรอกจำนวนหน่วยบริโภค")
    .moreThan(0, "จำนวนหน่วยบริโภคต้องมากกว่า 0"),
  ingredientsId: Yup.array().of(Yup.string().required()).min(1),
  unitsId: Yup.array().of(Yup.string()),
  subIngredients: Yup.array().of(Yup.string().notRequired()),
  steps: Yup.array()
    .of(Yup.string().required("กรุณากรอกขั้นตอนการประกอบอาหาร"))
    .min(1)
    .test("no empty string", (value) => {
      _.forEach(value, (v) => {
        if (v === "") {
          return false;
        }
      });
      return true;
    }),
  imageFileName: Yup.string().required("กรุณาเพิ่มรูปภ่าพ"),
});

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
      ingredientsId: value.ingredientsId,
      unitsId: value.unitsId,
      quantity: value.quantity,
      subIngredientsId: value.subIngredientsId,
      steps: value.steps,
      imageFileName: value.image,
      recipeImage: null,
    };
  }
  return {
    name: "",
    desc: "",
    method: "",
    serving: 1,
    ingredientsId: [],
    unitsId: [],
    quantity: [],
    subIngredientsId: [],
    steps: [""],
    imageFileName: "",
    recipeImage: Object,
  };
};

//-------------------
//  FORM DATA
//-------------------
export const createRecipeFormData = (value) => {
  let ingredients = [];
  _.forEach(value.ingredientsId, (id, index) => {
    ingredients.push({
      ingredient: id,
      quantity: value.quantity[index],
      unit: value.unitsId[index],
    });
  });
  const formData = new FormData();

  let data = {
    name: value.name,
    desc: value.desc,
    method: value.method,
    serving: value.serving,
    ingredients: ingredients,
    subIngredients: value.subIngredientsId,
    steps: value.steps,
  };

  formData.append("data", JSON.stringify(data));
  if (value.recipeImage !== null) {
    formData.append("recipeImage", value.recipeImage, value.imageFileName);
  }

  return formData;
};
