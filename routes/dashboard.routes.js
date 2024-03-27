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

// employeeRouter.get("/",auth,async(req,res)=>{
//     try {
//         const employees = await employeeModel.find();
//         res.status(200).send({"msg":"All employees are",employees})
        
//     } catch (error) {
//         res.send({"error":error})
//     }
// })

employeeRouter.patch("/:employeeId",auth,async(req,res)=>{
    const {employeeId} = req.params;
    try {
       
       await employeeModel.findByIdAndUpdate({_id:employeeId},req.body)
       res.status(200).send({"msg":"employee updated successfully"})
    } catch (error) {
        res.send({"error":error})
    }
})

employeeRouter.delete("/:employeeId",auth,async(req,res)=>{
    const {employeeId} = req.params;
    try {
       
       await employeeModel.findByIdAndDelete({_id:employeeId},req.body)
       res.status(200).send({"msg":"employee deleted successfully"})
    } catch (error) {
        res.send({"error":error})
    }
})


employeeRouter.get('/', auth, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    try {
        const employees = await employeeModel.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.send(employees);
    } catch (error) {
        res.send({ error: 'Internal server error' });
    }
});

// //tofilter
employeeRouter.get('/filter', auth, async (req, res) => {
    const { department } = req.query;
    try {
        const employees = await employeeModel.find({ department });
        res.send(employees);
    } catch (error) {
        res.send({ error: 'Internal server error' });
    }
});





// //tosort
employeeRouter.get('/sort', auth, async (req, res) => {
    const { sortBy } = req.query;
    try {
        const employees = await employeeModel.find().sort({ salary: sortBy });
        res.send(employees);
    } catch (error) {
        res.send({ error: 'Internal server error' });
    }
});


// //tosearch
employeeRouter.get('/search', auth, async (req, res) => {
    const { firstname } = req.query;
    try {
        const employees = await employeeModel.find({ firstName: { $regex: new RegExp(firstname, 'i') } });
        res.send(employees);
    } catch (error) {
        res.send({ error: 'Internal server error' });
    }
});


module.exports={
    employeeRouter
}