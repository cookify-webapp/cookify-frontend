import * as Yup from "yup";

export const RegisterValidateSchema = Yup.object().shape({
  username: Yup.string().required("กรุณากรอกชื่อผู้ใช้งาน"),
  email: Yup.string().email().required("กรุณากรอกอีเมล"),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*=+\-_])[a-zA-Z\d!@#$%^&*=+\-_]+$/,
      "รหัสผ่านต้องมีตัวเลขอย่างน้อย 1 ตัว, ภาษาอังกฤษพิมพ์เล็กอย่างน้อย 1 ตัว, ภาษาอังกฤษพิมพ์ใหญ่อย่างน้อย 1 ตัว, มีอักขระพิเศษอย่างน้อย 1 ตัว [!@#$%^&*=+-_], มีความยาวอย่างน้อย 8 ตัวอักษร แต่ไม่เกิน 32 ตัวอักษร"
    ),
  allergy: Yup.array().of(Yup.string()),
});
