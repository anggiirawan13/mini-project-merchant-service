import bcrypt from "bcrypt";

const encodePasswd = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const passHash = bcrypt.hashSync(password, salt);

  return passHash;
};

export default encodePasswd;
