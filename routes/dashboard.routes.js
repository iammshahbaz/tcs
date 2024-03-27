const express = require("express")
const {employeeModel} = require("../model/employeeModel")
const {auth} = require("../middleware/authmiddleware")
const employeeRouter = express.Router()



employeeRouter.post("/",auth,async(req,res)=>{
    const{firstname,lastname,department,salary} = req.body
    try {
        const employee = new employeeModel({
            firstname,lastname,department,salary
        })
        await employee.save();
        res.send({"msg":"new employee added successfully"})
    } catch (error) {
        res.send({"error":error})
    }
})

employeeRouter.get("/",auth,async(req,res)=>{
    try {
        const employees = await employeeModel.find();
        res.status(200).send({"msg":"All employees are",employees})
        
    } catch (error) {
        res.send({"error":error})
    }
})

employeeRouter.patch("/:employeeId",auth,async(req,res)=>{
    const {employeeId} = req.params;
    try {
       
       await employeeModel.findByIdAndUpdate({_id:employeeId},req.body)
       res.status(200).send({"msg":"employee updated successfully"})
    } catch (error) {
        res.send({"error":error})
    }
})

employeeRouter.patch("/:employeeId",auth,async(req,res)=>{
    const {employeeId} = req.params;
    try {
       
       await employeeModel.findByIdAndDelete({_id:employeeId},req.body)
       res.status(200).send({"msg":"employee deleted successfully"})
    } catch (error) {
        res.send({"error":error})
    }
})



module.exports={
    employeeRouter
}