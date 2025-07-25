const { SupportSectionRouter } = require("./support.router/support.router");

const router = require("express").Router();


router.use("/support", SupportSectionRouter)




module.exports = {
    AllRoutes : router
}