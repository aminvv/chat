const { NameSpaceController } = require("../../http/controller/support/namespace.controller")

const router=require("express").Router()

router.post("/add",NameSpaceController.addNameSpace)
router.get("/list",NameSpaceController.getListOfNamespace)


module.exports={
    apiNamespaceRouter:router
}