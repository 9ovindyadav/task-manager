class customeAPIError extends Error{

    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode 
    }
}

const createCustomError = (msg,statusCode)=>{
    return new customeAPIError(msg,statusCode);
};

module.exports = {createCustomError, customeAPIError};