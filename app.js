const express = require("express");
const connectDB = require("./db/connect-db")
require("dotenv").config();
const notFound = require("./Middlewares/not-found")

const app = express();

app.use(express.static("./public"));

//middleware
app.use(express.json());


const tasks = require("./Routes/tasks");
const errorHandlerMiddleware = require("./Middlewares/error-handler");
app.use("/api/v1",tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000 ;

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`Server is listening on port : ${port}`);
        })

    } catch (error) {
        console.log(error);
    }
}

start();