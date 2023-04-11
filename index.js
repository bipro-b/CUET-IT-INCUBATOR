const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


// 
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("server is running.");
})

const companyRoute = require("./src/routes/company");


app.use("/api/v1/company",companyRoute);

module.exports = app;