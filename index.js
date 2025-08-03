const express = require("express");
const app = express();
const cors = require("cors");


// 
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("server is running.");
})

app.get("/api/ec2",async(req,res)=>{
    res.send("Test ec2 after deploying");
})

const companyRoute = require("./src/routes/company");
const categoryRoute = require("./src/routes/category")
const userRoute = require("./src/routes/user")

app.use("/api/v1/company",companyRoute);
app.use("/api/v1/category",categoryRoute);
app.use("/api/v1/user",userRoute);

module.exports = app;