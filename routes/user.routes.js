const express = require("express")
const {UserModel} = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const e = require("express");
const userRouter = express.Router();


//signup

userRouter.post("/register", async (req, res) => {
    const {email,password,confirmPassword } = req.body;
    try {
        
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Check if user already exists
    //   else if (users.find(user => user.email === email)) {
    //         return res.status(400).json({ error: 'User already exists' });
    //     }
        else{
            bcrypt.hash(password, 8, async (err, hash) => {
                if (err) {
                    res.send({ "error": err });
                } else {
                    const user = new UserModel({ email, password:hash });
                    await user.save();
                    res.send({ "msg": "New user added successfully" });
                }
            });
        }
        
       
    } catch (error) {
        res.send({ "error": error });
    }
});

//login

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
         const user =  await UserModel.findOne({email})
         if(!user){
          res.send({"Error":"User Not Found"})
         }
         
         bcrypt.compare(password, user.password, (err, result) => {
               if(result){
                 const accessToken = jwt.sign({ userID:user._id,author:user.username }, 'masai')
                  res.send({"msg":"Login Successful",accessToken})
               }
               else{
                  res.send({"msg":"User Not Found.."})
                }
         });       
     } 
    catch (error) {
       res.send({"error":error})
       
    }
})


module.exports={
    userRouter
}