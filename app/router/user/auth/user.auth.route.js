const { UserAuthController } = require("../../../http/controller/auth/user.auth.controller");

const router = require("express").Router();
router.post("/get-otp", UserAuthController.getOtp)
router.post("/check-otp", UserAuthController.checkOtp)
router.post("/refresh-token", UserAuthController.refreshToken)

module.exports = {
    UserAuthRoutes : router
}