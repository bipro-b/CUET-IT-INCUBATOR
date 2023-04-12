const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const userSchema = mongoose.Schema({
    email:{
        type:String,
        validator:[validator.isEmail, "Provide a valid Email."],
        trim:true,
        unique:true,
        required:[true,"Email address is required."]
    },
    password:{
        type:String,
        required:{
            validator: (value)=>
            validator.isStrongPass(value,{
                minLength: 6,
                minLowercase:3,
                minNumbers:1,
                minUppercase:1,
                minSymbol:1,
            }),
            message:"Password {value} is not strong enough.",
        }
    },
    confirmedPassword: {
        type:String,
        required:[true,"Please confirm your password"],
        validate:{
            validator: function(value){
                return value === this.password;
            },
            message:"Password doesn't match!"
        }
    },
    role:{
        type: String,
        enum: ["user","admin","teacher"],
        default:"user"
    },
    firstName:{
      type:String,
      required:[true,"Please enter your First name."],
      trim:true,
      minLength:[3,"Name must be at least 3 char."]
    },
    lastName:{
        type:String,
        required:[true,"Please enter your First name."],
        trim:true,
        minLength:[3,"Name must be at least 3 char."]
    },
    contactNumber:{
        type: String,
        validate:[
            validator.isMobilePhone,
            "Please provide a valid contact number."
        ]
    }
},{timestamps:true})

userSchema.pre("save",function(next){
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmedPassword = undefined;
    next();
})

userSchema.methods.comparePassword = function(password,hash){
    const isPasswordValid = bcrypt.compareSync(password,hash);
    return isPasswordValid;
}


const User = mongoose.model("User",userSchema);
module.exports = User;