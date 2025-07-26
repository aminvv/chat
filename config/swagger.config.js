const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition: {
            openapi: "3.0.1",
            info: {
                title: "chat-backend",
                description: "backend chat room",
                version: "1.0.0",
            },
        },
        apis: ["./app/router/**/*.js"],
    });

    const swagger = swaggerUi.setup(swaggerDocument, {});
    app.use("/swagger", swaggerUi.serve, swagger);
    
    console.log(`Swagger UI is running on http://localhost:3000/swagger`);
}

module.exports = SwaggerConfig;