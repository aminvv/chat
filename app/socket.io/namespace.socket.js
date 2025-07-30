const { ConversationModel } = require("../models/conversation.model")

module.exports = class NamespaceSocketHandler {
    #io
    constructor(io) {
        this.#io = io
    }

    initConnection() {
        this.#io.on("connection", async socket => {
            const namespace = await ConversationModel.find({}, { title: 1, endpoint: 1 }).sort({ _id: 1 })
            socket.emit("namespaceList", namespace)
        })
    }



    async createNamespaceConnection() {
        const namespaces = await ConversationModel.find({}, { title: 1, endpoint: 1, rooms: 1 }).sort({ _id: 1 })
        for (const namespace of namespaces) {
            this.#io.of(`/${namespace.endpoint}`).on("connection", async (socket) => {
                const conversation = await ConversationModel.findOne({ endpoint: namespace.endpoint }, { rooms: 1,endpoint:1 }).sort({ _id: 1 }).lean();


                socket.on("joinRoom", async roomName => {
                    const lastRoom = Array.from(socket.rooms)[1]
                    if (lastRoom) {
                        socket.leave(lastRoom)
                        await this.getCountOfOnlineUsers(conversation.endpoint, roomName)

                    }
                    socket.join(roomName)
                    await this.getCountOfOnlineUsers(conversation.endpoint, roomName)
                    const roomInfo = conversation.rooms.find(item => item.name == roomName)
                    socket.emit("roomInfo", roomInfo)
                    this.getNewMessage(socket)
                    socket.on("disconnect", async()=>{
                        await this.getCountOfOnlineUsers(conversation.endpoint, roomName)
                    })
                })


                socket.emit("roomList", conversation.rooms)
            })
        }
    }



   async getCountOfOnlineUsers(endpoint, roomName) {
        const onlineUsers = await this.#io.of(`/${endpoint}`).in(roomName).allSockets()
        this.#io.of(`/${endpoint}`).in(roomName).emit("countOfOnlineUsers", Array.from(onlineUsers).length)
    }


     getNewMessage(socket) {
    // ابتدا تابع handler را تعریف کنید
    const messageHandler = async (data) => {
        const {message, roomName, endpoint} = data;
        await ConversationModel.updateOne({endpoint,"rooms.name":roomName},{
            $push:{
                "rooms.$.messages":{
                    message,
                    sender:"1d54789db65a2b57b4e6a6b4",
                    dateTime:Date.now()
                }
            }
        });
    };

    // حالا به این صورت استفاده کنید:
    socket.off("newMessage", messageHandler); // تغییر اصلی اینجا است
    socket.on("newMessage", messageHandler);
}




}

 

