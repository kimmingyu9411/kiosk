const router = require("express").Router();
const auth = require("../middleware/auth.js");
const UserController = require("../controller/user.controller.js");
const userController = new UserController();

/*
    GET '/user/me' 개인 정보 조회
    POST '/user/signup' 회원 가입
    POST '/user/login' 로그인
    PUT '/user/:userId' 정보 수정
    DELETE 'user/:userId' 회원 탈퇴
*/

router.post("/signup", userController.createUser);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.delete("/deleteUser",auth, userController.deleteUser);

module.exports = router;
