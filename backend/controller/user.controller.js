const UserModel = require("../models/user.model");
const LeaveModel = require("../models/leave.model");;
const constant = require("../constant");
const { CASUAL, SICK } = constant.leaveOption;

// CREATE USER
module.exports.createUser = async (req, res) => {
    try {
        const { username, department } = req.body;
        const newUser = await new UserModel({ username, department }).save();
        res.status(201).json({
            status: "success",
            data: newUser
        })
    } catch (error) {
        res.status(400).json({
            status: "faild",
            errorMessage: error.message
        })
    }
}
// USER LIST
module.exports.userList = async(req,res)=>{
    try{
        const list = await UserModel.find({});
        res.status(200).json({
            status:"success",
            data:list
        });
    }catch(error){
        res.status(400).json({
            status:"fail",
            errorMessage:error.message
        });
    }
}
// USER DETAIL
module.exports.userDetail = async(req,res)=>{
    try{
        const {id} = req.params;
        const detail = await UserModel.findById(id);
        const leaveHistory = await LeaveModel.find({user:id});
        res.status(200).json({
            status:"success",
            data:{
                detail,
                leaveHistory
            }
        })
    }catch(error){
        res.status(404).json({
            status:"fail",
            errorMessage:error.message
        });
    }
}

// CREATE LEAVE
module.exports.leaveApply = async (req, res) => {
    try {
        const { user, fromDate, toDate, leaveType } = req.body;
        //find user if user is not exist then throw error user not found
        const userFound = await UserModel.findById(user);
        if (!userFound) {
            throw new Error("User not found", 404);
        }
        // Duration 
        const from = new Date(fromDate);
        const to = new Date(toDate);
        const diffInMs = Math.abs(to - from);
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        //check leave is available or not
        let remainLeave = 0;
        if (leaveType == CASUAL) {
            const casual = userFound.casualLeaves
            if (diffInDays <= casual && diffInDays > 0) {
                remainLeave = casual - diffInDays;
                userFound.casualLeaves = remainLeave;
                await userFound.save();
            } else {
                throw new Error("'Not enough casual leaves available'", 404);
            }
        } else if (leaveType == SICK) {
            const sick = userFound.sickLeaves
            if (diffInDays <= sick && diffInDays > 0) {
                remainLeave = sick - diffInDays;
                userFound.sickLeaves = remainLeave;
                await userFound.save();
            } else {
                throw new Error("'Not enough sick leaves available'", 404);
            }
        }
        const leave = await new LeaveModel({ user, leaveType, fromDate,toDate }).save();
        
        //End check leave is available or not
        res.status(200).json({
            status: "success",
            data:leave
        })


    } catch (error) {
        res.status(400).json({
            status: "faild",
            errorMessage: error.message
        })
    };
}

