const Controller = require("./../controller")
const { StatusCodes: HttpStatus } = require("http-status-codes")
const { ConversationModel } = require("../../../models/conversation.model")
const createHttpError = require("http-errors")


class NameSpaceController extends Controller {

    async addNameSpace(req, res, next) {
        try {
            const { title, endpoint } = req.body
            await  this.findNamespaceWithEndpoint(endpoint)
            const conversation = await ConversationModel.create({
                title,
                endpoint
            })
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                message: 'create conversation successfully '
            })

        } catch (error) {
            next(error)
        }
    }





    async getListOfNamespace(req, res, next) {
        try {
            const namespace = await ConversationModel.find({}, { rooms: 0 })
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    namespace
                }
            })

        } catch (error) {
            next(error)
        }
    }




    async findNamespaceWithEndpoint(endpoint) {
        const conversation = await ConversationModel.findOne({ endpoint })
        if (conversation) {
            throw createHttpError.BadRequest(" This namespace has already been chosen.")
        }
    }


}





module.exports = {
    NameSpaceController: new NameSpaceController
}