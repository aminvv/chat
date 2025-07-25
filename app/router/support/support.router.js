const { SupportController } = require("../../http/controller/support.controller")

const router=require("express").Router()

router.get("/",SupportController.renderChatRoom)


module.exports={
    SupportSectionRouter:router
}