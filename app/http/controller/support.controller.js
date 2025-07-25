const Controller = require("./controller")

 class SupportController extends Controller{
    renderChatRoom(req,res){
     try {
           return  res.render('chat.ejs')
     } catch (error) {
        next(error)
     }
    }
 }



 module.exports={
    SupportController: new SupportController
 }