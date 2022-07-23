import * as Yup from 'yup'
import _ from 'lodash'

export const profileValidateSchema = Yup.object().shape({
  email: Yup.string().email('กรุณากรอกอีเมลให้ถูกต้อง').required('กรุณากรอกอีเมล'),
})

//-------------------
//  FORM DATA
//-------------------
export const createProfileFormData = (value) => {
  let ingredientsId = [];
  _.forEach(value.allergy, (item) => {
    ingredientsId.push(item._id);
  });
  const formData = new FormData();

  let data = {
    email: value.email,
    allergy: ingredientsId
  };

  formData.append("data", JSON.stringify(data));
  if (value.profileImage !== null) {
    formData.append("userImage", value.profileImage, value.imageFileName);
  }

  return formData;
};