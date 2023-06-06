const express = require("express");
const app = express();
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const port = process.env.port || 5000;

//Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Customer API",
            description: "Customer API Information",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:5000"]

        }
    },
    // ['.routes/*.js]
    apis: ["app.js"]
};

const swaggerDocs = swaggerJSdoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// Routes
/**
 * @swagger
 * /Customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *          description: A successful response
 */


// Routes
app.get("/Customers", (req, res) =>{
    res.status(200).send("Customer results");

});



// Routes
/**
 * @swagger
 * /Customers:
 *  put:
 *    description: Use to update all customers
 *    responses:
 *      '201':
 *          description: Updated response
 */


// Routes
app.put("/Customers", (req, res) =>{
    res.status(200).send("Updated Customer");

});






app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});