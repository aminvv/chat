const Controller = require("../controller")
const {UserModel} = require("../../../models/user.model")
const {SignAccessToken} = require("../../../utils/functions")
const { sign } = require("jsonwebtoken")

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
 
   async login(req, res, next){
        try {
            const {mobile} = req.body;
            const user = await UserModel.findOne({mobile})
            if(!user){
                return res.render("login.ejs", {
                   error: "نام کاربری صحیح نمیباشد"
               })
            }
            const token = await SignAccessToken(user._id);
            res.cookie("authorization", token, {signed: true, httpOnly: true, expires: new Date(Date.now() + 1000*60*60*1)})
            user.token = token;
            user.save();
            return res.redirect("/support");
        } catch (error) {
            next(error)
        }
    }


   }

 module.exports={
    SupportController: new SupportController
 }