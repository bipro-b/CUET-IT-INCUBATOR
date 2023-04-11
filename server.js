const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const colors = require("colors");


const app = require("./index");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.esqxh.mongodb.net/incubator?retryWrites=true&w=majority`

mongoose.connect(uri).then(()=>{
    console.log(`Database is connected successfully`.green.bold);
})

const port  = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`App is running on port ${port}`.yellow.bold)
})