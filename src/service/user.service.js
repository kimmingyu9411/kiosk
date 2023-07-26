const UserRepository = require("../repository/user.repository.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  createUser = async (email, password, confirmPassword) => {
    const emailReg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const passwordReg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    if (!emailReg.test(email)) {
      return {
        status: 400,
        errorMessage: "이메일 형식이 일치하지 않습니다.",
      };
    }
    if (password !== confirmPassword) {
      return { status: 400, errorMessage: "패스워드가 일치하지 않습니다." };
    }
    if (!passwordReg.test(password)) {
      return {
        status: 400,
        errorMessage: "비밀번호 형식이 일치하지 않습니다.",
      };
    }

    const hashPassword = await bcrypt.hash(password, 5);

    password = hashPassword;

    return await this.userRepository.createUser(email, password);
  };

  login = async (email, password) => {
    const user = await this.userRepository.login(email);
    if (!user) {
      return {
        status: 400,
        errorMessage: "이메일 혹은 비밀번호가 일치하지 않습니다.",
      };
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user || passwordMatch) {
      const token = jwt.sign({ id: user.id }, "custom-secret-key");
      return {
        status: 200,
        message: "로그인이 되었습니다.",
        token,
      };
    } else {
      return {
        status: 400,
        errorMessage: "이메일 혹은 비밀번호가 일치하지 않습니다.",
      };
    }
  };
  deleteUser = async (user, password) => {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return {
        status: 400,
        errorMessage: "현재 비밀번호가 일치하지 않습니다.",
      };
    }
    return await this.userRepository.deleteUser(user.id);
  };
}

module.exports = UserService;
