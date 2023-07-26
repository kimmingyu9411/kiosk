const UserService = require("../service/user.service.js");

class UserController {
  constructor() {
    this.userService = new UserService();
  }
  createUser = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;

    const user = await this.userService.createUser(
      email,
      password,
      confirmPassword
    );

    if (user.status === 400) {
      res.status(400).json({ errorMessage: user.errorMessage });
    } else {
      return res.status(200).json({ message: user.message });
    }
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    if (token.status === 400) {
      res.status(400).json({ errorMessage: token.errorMessage });
    } else {
      res.cookie("Authorization", `Bearer ${token.token}`);
      return res.status(200).json({ message: token.message });
    }
  };

  logout = async (req, res, next) => {
    try {
      return res
        .clearCookie("Authorization")
        .json({ message: "로그아웃 성공하였습니다." });
    } catch (err) {
      return res.status(400).json({ errorMessage: "로그아웃 실패하였습니다." });
    }
  };
  deleteUser = async (req, res, next) => {
    const user = res.locals.user;
    console.log(user);
    const { password } = req.body;
    const deleteUser = await this.userService.deleteUser(user, password);
    if (deleteUser.status === 400) {
      return res.status(400).json({ errorMessage: deleteUser.errorMessage });
    } else {
      res.clearCookie("Authorization");
      return res.status(200).json({ message: deleteUser.message });
    }
  };
}

module.exports = UserController;
