const { SupportController } = require("../../http/controller/support/support.controller");
const { apiNamespaceRouter } = require("./namespace.router")
const { apiRoomRouter } = require("./room.router")

const router=require("express").Router()

router.use("/namespace",apiNamespaceRouter)
router.use("/room",apiRoomRouter)
router.get("/",SupportController.renderChatRoom)


module.exports={
    SupportSectionRouter:router
}