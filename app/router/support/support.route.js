const { SupportController } = require("../../http/controller/support/support.controller");
const { checkLogin, checkAccessLogin } = require("../../http/middleware/auth");
const { apiNamespaceRouter } = require("./namespace.route")
const { apiRoomRouter } = require("./room.route")

const router=require("express").Router()

router.use("/namespace",apiNamespaceRouter)
router.use("/room",apiRoomRouter)
router.get("/login",checkAccessLogin,SupportController.loginForm)
router.post("/login",checkAccessLogin,SupportController.login)
router.get("/",checkLogin,SupportController.renderChatRoom)



module.exports={
    SupportSectionRouter:router
}