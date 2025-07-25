const autoBind = require("auto-bind").default;

module.exports = class Controller{
    constructor(){
        autoBind(this)
    }
    testMethod(){
        return "Test String"
    }
}