const { SupportSectionRouter } = require("./support/support.router");

const router = require("express").Router();

router.use("/support", SupportSectionRouter);

module.exports = {
    AllRoutes : router
};
