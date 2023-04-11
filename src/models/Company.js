const mongoose = require("mongoose")

const companySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide company name."],
        trim: true,
        unique:[true,"Please provide unique name."],
    },
    description:{
        type:String,
        required: true,
    },
    imageURLs:[
       {
        type:String,
        validator:{
            validator:(value)=>{
                if(Array.isArray(value)){
                    return false;
                }
                let isValid = true;
                value.forEach((url)=>{
                    if(!validator.isUrl(url)){
                        isValid=false;
                    }
                })
                return isValid;
                },
                message:"Please provide valid image urls",
            }
        }
       
    ],
    service:{
        type:  Array,
        required:[true,"Please provide services."],
        lowercase:true,
        validate: {
            validator: function (v) {
              return Array.isArray(v) && v.length > 0;
            },
            message: 'Services must be a non-empty array'
          }
    },
    jobVacant:{
        type:Number,
        default:0,
        min:0

    }

},
{ timestamps: true }
)

const Company = mongoose.model("Company",companySchema);
module.exports= Company;