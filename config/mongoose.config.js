const { default: mongoose } = require("mongoose");

function connectToDB(DB_URI) {
    mongoose.connect(DB_URI).then(() => {
        console.log("connected to DB.");
    }).catch(err => {
        console.log(err?.message ?? "Failed DB connection");
    })

}

module.exports = connectToDB;