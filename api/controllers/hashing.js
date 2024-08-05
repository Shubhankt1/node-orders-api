// BCrypt
const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  return await bcrypt
    .hash(password, 10)
    .then((hash) => {
      return hash;
    })
    .catch((err) => {
      console.log("BCrypt Error:\n", err);
      throw Exception(err);
    });
};

exports.compareHash = async (plainTextPw, password) => {
  return await bcrypt
    .compare(plainTextPw, password)
    .then((result) => result)
    .catch((err) => {
      console.log(err);
      return false;
    });
};
