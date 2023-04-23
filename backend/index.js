const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Routers
const Users = require("./routes/user.route");
const app = express();
//DB Connection
mongoose.connect("mongodb://localhost:27017/leave_system")
.then(()=>{
    console.log("DB connected");
})
.catch(error=>{
    console.log(error);
})
//End DB Connection

//Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", Users);
//End Middleware


const port = process.env.PORT || 8000;

app.listen(port,()=>{
    console.log("Server is running on",port);
})
