const asyncMiddleware = require("../Middlewares/async");
const Task = require("../Models/Task");
const { createCustomError } = require("../error/custome-error");

const getAllTasks = asyncMiddleware( async (req,res)=>{
   
        const tasks = await Task.find({});
        res.status(200).json({success:true,data: tasks});
});

const createTask = asyncMiddleware( async (req,res)=>{

        const task = await Task.create(req.body);
    res.status(201).json({success:true,data: task});
        
});

const getTask = asyncMiddleware( async (req,res,next)=>{
    
        const {id: taskID} = req.params ;
    const task = await Task.findOne({_id:taskID});
    
    if(!task){
        return next(createCustomError(`no task with id: ${taskID}`,404));
    }

    res.status(200).json({success:true, data: task});

});

const updateTask = asyncMiddleware( async (req,res)=>{
    
        const {id:taskID} = req.params ;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new: true,
            runValidators: true
        });
        if(!task){
            return next(createCustomError(`no task with id: ${taskID}`,404));
        }
        res.status(200).json({task});
   
})

const deleteTask = asyncMiddleware( async (req,res)=>{

        const {id:taskID} = req.params ;
    const task = await Task.findOneAndDelete({_id:taskID});
    if(!task){
        return next(createCustomError(`no task with id: ${taskID}`,404));
    }
    res.status(200).json({msg: "Task removed"});
   
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}