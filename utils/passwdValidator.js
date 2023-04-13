import passwordValidator from "password-validator";

const schema = new passwordValidator();

const passSchema = schema
  .is()
  .min(8)
  .is()
  .max(32)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces();

const validatePassword = (password) => {
  const passwordValid = passSchema.validate(password);

  if (passwordValid) return true;

  return false;
};

export default validatePassword;
