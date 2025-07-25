const { RoomController } = require("../../http/controller/support/room.controller")

const router=require("express").Router()

router.get("/add",RoomController.addRoom)
router.get("/list",RoomController.getListOfRoom)


module.exports={
    RoomSectionRouter:router
}