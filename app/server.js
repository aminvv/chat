const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const { AllRoutes } = require("./router/router");
const { initialSocket } = require("./utils/initSocket");




module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.createServer()
    this.initTemplateEngine();
    this.createRoutes();
  }


  createServer() {
    const http = require("http");
    const server = http.createServer(this.#app)
    const io = initialSocket(server)
    server.listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
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



}


