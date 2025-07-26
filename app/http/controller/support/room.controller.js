const path = require("path")
const Controller = require("./../controller")
const {StatusCodes: HttpStatus} = require("http-status-codes")
const createHttpError = require("http-errors")
const { ConversationModel } = require("../../../models/conversation.model")


class RoomController extends Controller {

    async addRoom(req, res, next) {
        try {
            const { name, description, filename, fileUploadPath, namespace } = req.body
            await this.findConversationWithEndpoint(namespace)
            await this.findNamespaceWithName(name)
            const image = path.join(fileUploadPath, filename).replace(/\\/g, "/")
            const room = { name, description, image }
            await ConversationModel.updateOne({ endpoint: namespace }, { $push: { rooms: room } })
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {

                    message: 'create room successfully '
                }
            })

        } catch (error) {
            next(error)
        }
    }





    async getListOfRoom(req, res, next) {
        try {
            const conversation = await ConversationModel.find({}, { rooms: 1 })
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    rooms: conversation.rooms
                }
            })

        } catch (error) {
            next(error)
        }
    }



    async findNamespaceWithName(name) {
        const conversation = await ConversationModel.findOne({ "rooms.name": name })
        if (conversation) {
            throw createHttpError.BadRequest(" This name has already been chosen.")
        }
    }

    async findConversationWithEndpoint(endpoint) {
        const conversation = await ConversationModel.findOne({ endpoint })
        if (!conversation) {
            throw createHttpError.NotFound(" not found conversation")
        }
        return conversation
    }




}



module.exports = {
    RoomController: new RoomController
}