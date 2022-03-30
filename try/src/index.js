const express = require("express");

const skinController=require("./controllers/skin.controllers")
const app = express();

app.use(express.json());
app.use("/skin",skinController)

module.exports = app;

