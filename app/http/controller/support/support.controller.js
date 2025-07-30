const Controller = require("../controller")
const {UserModel} = require("../../../models/user.model")
const {SignAccessToken} = require("../../../utils/functions")

 class SupportController extends Controller{
    renderChatRoom(req,res,next){
     try {
           return  res.render('chat.ejs')
     } catch (error) {
        next(error)
     }
    }
    loginForm(req,res,next){
       try {
           return  res.render('login.ejs',{
            error:undefined
           })
     } catch (error) {
        next(error)
     }
    }
 
    async login(req,res,next){
     try {
      const {mobile}=req.body
      const user=await UserModel.findOne({mobile})
      if(!user){
         return res.render("login.ejs",{
            error:"شماره موبایل صحیح نمی باشد"
         })
      }
      const token=await SignAccessToken(user._id)
      return res.json(token)

     } catch (error) {
        next(error)
     }
    }



   }

 module.exports={
    SupportController: new SupportController
 }