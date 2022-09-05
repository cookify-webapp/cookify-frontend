import * as Yup from "yup";
import _ from "lodash";

export const snapshotValidateSchema = Yup.object().shape({
  caption: Yup.string().required("กรุณากรอกคำอธิบาย"),
  recipe: Yup.object().required('กรุณาเลือกสูตรอาหาร'),
  imageFileName: Yup.string().required("กรุณาเพิ่มรูปภ่าพ"),
});

//-----------------
// INITIAL VALUE
//-----------------
export const snapshotInitialValues = (value?: any) => {
  if (value) {
    return {
      caption: value.caption,
      recipe: value.recipe,
      imageFileName: value.image,
      snapshotImage: null,
    };
  }
  return {
    caption: '',
    recipe: null,
    imageFileName: "",
    snapshotImage: null,
  };
};

//-------------------
//  FORM DATA
//-------------------
export const createSnapshotFormData = (value) => {
  const formData = new FormData()

  let data = {
    caption: value.caption,
    recipe: value.recipe._id
  };

  formData.append("data", JSON.stringify(data));
  if (value.snapshotImage !== null) {
    formData.append("snapshotImage", value.snapshotImage, value.imageFileName);
  }

  return formData;
};