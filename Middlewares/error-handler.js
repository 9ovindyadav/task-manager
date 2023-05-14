const { customeAPIError } = require("../error/custome-error");

const errorHandlerMiddleware = (err,req,res,next)=>{
    if(err instanceof customeAPIError){
        return res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(500).json({msg: err});
}

module.exports = errorHandlerMiddleware;