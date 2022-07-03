import * as Yup from "yup";

export const LoginValidateSchema = Yup.object().shape({
  username: Yup.string().required('กรุณากรอกชื่อผู้ใช้งาน'),
  password: Yup.string().required('กรุณากรอกรหัสผ่าน')
});