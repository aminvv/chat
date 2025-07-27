const {ConversationModel} = require("../models/conversation.model")

module.exports= class NamespaceSocketHandler {
    #io
    constructor(io){
        this.#io=io
    }

    initConnection(){
        this.#io.on("connection",async socket=>{
            const namespace=await ConversationModel.find({},{title:1,endpoint:1}).sort({_id:1})
            socket.emit("namespaceList",namespace)
        })
    }



    async createNamespaceConnection(){
            const namespaces=await ConversationModel.find({},{title:1,endpoint:1, rooms:1}).sort({_id:1})
            for (const namespace of namespaces) {
                this.#io.of(`/${namespace.endpoint}`).on("connection",async(socket)=>{
                const conversation = await ConversationModel.findOne(
                    {endpoint: namespace.endpoint}, 
                    {rooms: 1}
                ).sort({_id:1}).lean();
            socket.emit("roomList",conversation.rooms)
                })
        }
        }


 

 
    }



