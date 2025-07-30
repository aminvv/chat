const { SupportController } = require("../../http/controller/support/support.controller");
const { apiNamespaceRouter } = require("./namespace.route")
const { apiRoomRouter } = require("./room.route")

const router=require("express").Router()

router.use("/namespace",apiNamespaceRouter)
router.use("/room",apiRoomRouter)
router.get("/login",SupportController.loginForm)
router.post("/login",SupportController.login)
router.get("/",SupportController.renderChatRoom)


module.exports={
    SupportSectionRouter:router
}