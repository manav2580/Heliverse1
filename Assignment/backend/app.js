const express= require('express');
const app=express();
const cors = require('cors');
app.use(cors())
const errorMiddleware=require('./middleware/error');
const cookieParser=require('cookie-parser');
app.use(express.json())
app.use(cookieParser());
const team=require('./routes/teamRoute');
const user=require('./routes/userRoute');
// const process=require('./routes/processRoute');
app.use("/api/v1",team);
app.use("/api/v1",user);
// app.use("/api/v1",process);
app.use(errorMiddleware);

//Middleware for error
module.exports=app
