const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const { AllRoutes } = require("./router/router");
const { initialSocket } = require("./utils/initSocket");
const { socketHandler } = require("./socket.io");
const SwaggerConfig = require("./../config/swagger.config");
const connectToDB = require("../config/mongoose.config");
const createError = require('http-errors'); 



module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication()
    this.createServer()
    this.connectToMongoDB()
    this.initSwagger();
    this.initTemplateEngine();
    this.createRoutes();
    this.errorHandling();
  }




  configApplication() {
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
  }



  createServer() {
    const http = require("http");
    const server = http.createServer(this.#app)
    const io = initialSocket(server)
        socketHandler(io) 
    server.listen(this.#PORT, () => {
      console.log("server UI is running on http://localhost:" + this.#PORT);
    });
  }



  initTemplateEngine() {
    this.#app.use(expressEjsLayouts)
    this.#app.set("view engine", "ejs");
    this.#app.set("views", "resource/views");
    this.#app.set("layout extractStyles", true);
    this.#app.set("layout extractScripts", true);
    this.#app.set("layout", "./layouts/master");

  }


  createRoutes() {
    this.#app.use(express.static('public'))
    this.#app.use(AllRoutes);
  }


  initSwagger() {
    SwaggerConfig(this.#app);
  }

  connectToMongoDB() {
    connectToDB(this.#DB_URI)
  } 


    errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("router not found"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        statusCode,
        errors: {
          message,
        },
      });
    });
  }


}


