const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types;
const validator = require("validator")

const categorySchema = mongoose.Schema({
    type:{
        type:String,
        trim: true,
        required: [true, "Please Provide type"]
    },
    solution: {
        type: String,
        trim: true,
        required:[true,"Provide Category name"],
    },
    descriptions: String,
    technology:{
        type:  Array,
        required:[true,"Please provide technology."],
        lowercase:true,
        validate: {
            validator: function (v) {
              return Array.isArray(v) && v.length > 0;
            },
            message: 'technology must be a non-empty array'
          }
    },
    /*companies:[
        {
            type:ObjectId,
            ref:"Company"
        }
    ]*/

},{timestamps:true})

const Category = mongoose.model("Category",categorySchema);
module.exports = Category;