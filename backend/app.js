const express = require("express");
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc');

const mongoose = require("mongoose");
const programRouter = require("./router/route");
const busInfoRouter = require("./router/businfo")
const busRoute = require("./router/busroutes")

const booking = require("./router/Booking")

const url = "mongodb://127.0.0.1/user";

const app = express();

const options = {
  swaggerDefinition:{
    openapi:'3.0.1',
    info:{
      title:'Bus Ticket Booking System',
      version:'1.0.0',
 },
 servers:[
   {
     url:"http://localhost:2112/"
   }

],
},
  apis:["./router/*.js"],
}
const swaggerSpecs = swaggerJsdoc(options)
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpecs))
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected.......");
});
const cors = require('cors')
app.use(cors())

app.use(express.json());

app.use("/info", programRouter);
app.use("/businfo", busInfoRouter);
app.use("/busroute", busRoute);

app.use("/booking", booking);


app.listen(2112, () => {
  console.log("Started the server @",2112);
});
