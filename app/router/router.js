const { SupportSectionRouter } = require("./support/support.route");
const { UserAuthRoutes } = require("./user/auth/user.auth.route");

const router = require("express").Router();

router.use("/support", SupportSectionRouter);
router.use("/user", UserAuthRoutes);
module.exports = {
    AllRoutes : router
};
