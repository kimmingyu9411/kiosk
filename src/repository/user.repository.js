const User = require("../db/models/user");

class UserRepository {
  async createUser(email, password) {
    // 이미 존재하는 이메일인지 확인
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { status: 400, errorMessage: "이미 존재하는 이메일입니다." };
    }

    // 존재하지 않는 경우, 새로운 유저 생성
    await User.create({
      email,
      password,
    });
    return {
      status: 200,
      message: "회원가입이 완료되었습니다.",
    };
  }

  async login(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  async deleteUser(id) {
      const user = await User.findByPk(id);

      const deleteuser = await user.destroy();
      if (deleteuser) {
        return {
          status: 200,
            message: "회원 탈퇴가 되었습니다.",
        };
      } else {
        return {
          status: 400,
          errorMessage: "존재하지 않는 아이디입니다.",
        };
      }
    }     
}

module.exports = UserRepository;
