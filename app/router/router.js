const { SupportSectionRouter } = require("./support.router/support.router");
const namespaceRouter = require("./support/namespace.router");
const { RoomSectionRouter } = require("./support/room.router");

const router = require("express").Router();


router.use("/support", SupportSectionRouter)
router.use("/room", RoomSectionRouter)
router.use("/namespace", namespaceRouter)




module.exports = {
    AllRoutes : router
}