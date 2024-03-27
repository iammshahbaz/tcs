const express = require("express")
require("dotenv").config()
const{connection} = require("./config/db")
const {userRouter} = require("./routes/user.routes")
const {employeeRouter} = require("./routes/dashboard.routes")
const app = express();
app.use(express.json());


app.use("/users",userRouter)
app.use("/employees",employeeRouter)


app.listen(process.env.port,async ()=>{
    try {
         await connection
         console.log("connected to DB")
         console.log(`Server is ruuning at port ${process.env.PORT}`);
    } catch (error) {
        console.log(error)
    }
    
})
