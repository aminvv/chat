const {ConversationModel} = require("../models/conversation.model")

module.exports= class NamespaceSocketHandler {
    #io
    constructor(io){
        this.#io=io
    }

    initConnection(){
        this.#io.on("connection",async socket=>{
            const namespace=await ConversationModel.find({},{title:1,endpoint:1}).sort({_id:-1})
            socket.emit("namespaceList",namespace)
        })
    }



    async createNamespaceConnection(){
            const namespace=await ConversationModel.find({},{title:1,endpoint:1, rooms:1}).sort({_id:-1})
        for (const namespace of namespaces) {
                this.#io.of(`/${namespace.endpoint}`).on("connection",()=>{
            socket.emit("namespaceList",namespace.rooms)
                })
        }
        }





    }



