import * as Yup from "yup";

export const RegisterValidateSchema = Yup.object().shape({
  username: Yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
  email: Yup.string().email('กรุณากรอกอีเมลให้ถูกต้อง').required("กรุณากรอกอีเมล"),
  password: Yup.string()
    .required('กรุณากรอกรหัสผ่าน').min(8, 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร').max(32, 'รหัสผ่านต้องมีความยาวไม่เกิน 32 ตัวอักษร')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*=+\-_])[a-zA-Z\d!@#$%^&*=+\-_]+$/,
      "รหัสผ่านต้องประกอบไปด้วยตัวอักษรภาษาอังกฤษทั้งพิมพ์เล็กและพิมพ์ใหญ่, มีตัวเลขอย่างน้อย 1 ตัว, มีอักขระพิเศษอย่างน้อย 1 ตัว [!@#$%^&*=+-_] และต้องมีความยาวอย่างน้อย 8 ตัวอักษร แต่ไม่เกิน 32 ตัวอักษร"
    ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน').required('กรุณายืนยันรหัสผ่าน'),
  stepForm: Yup.number().required(),
  isAllergic: Yup.boolean(),
  ingredients: Yup.array().when(["isAllergic", "stepForm"], {
    is: (isAllergic, stepForm) => isAllergic === true && stepForm === 2,
    then: Yup.array().required().min(1),
    otherwise: Yup.array().min(0).notRequired(),
  })
});
