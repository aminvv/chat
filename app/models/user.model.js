const { default: mongoose, model } = require("mongoose");


const UserSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: { type: Object, default: { code: 0, expiresIn: 0 } },
    birthday: { type: String },
    Role: { type: String, default: "USER" },

}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
UserSchema.index({ first_name: "text", last_name: "text", username: "text", mobile: "text", email: "text" })
module.exports = {
    UserModel: mongoose.model("user", UserSchema)
}

