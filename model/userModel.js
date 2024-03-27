const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true},
    confirmPassword:{type:String},
    department:{type:String},
    salary:{type:Number},

    

},{
    versionkey : false
})

const UserModel = mongoose.model("users",userSchema)

module.exports={
    UserModel
}