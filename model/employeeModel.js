const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    department:{type:String},
    salary:{type:Number},

    

},{
    versionkey : false
})

const employeeModel = mongoose.model("employee",employeeSchema)

module.exports={
    employeeModel
}