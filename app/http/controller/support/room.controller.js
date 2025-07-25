const Controller = require("./../controller")


class RoomController extends Controller {

    async addRoom(req, res, next) {
        try {
            const { title, endpoint } = req.body
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





    async getListOfRoom(req, res, next) {
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





}



module.exports = {
    RoomController: new RoomController
}