const express = require("express")
require("dotenv").config()
const{connection} = require("./config/db")
const {userRouter} = require("./routes/user.routes")
const {employeeRouter} = require("./routes/dashboard.routes")
const app = express();
app.use(express.json());
const cors = require("cors")

app.use(cors())
app.use("/users",userRouter)
app.use("/employees",employeeRouter)


app.listen(process.env.PORT,async ()=>{
    try {
         await connection
         console.log("connected to DB")
         console.log(`Server is ruuning at port ${process.env.PORT}`);
    } catch (error) {
        console.log(error)
    }
    
})
