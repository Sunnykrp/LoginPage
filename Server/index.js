const express=require("express");
const dotenv=require('dotenv').config();
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
const cookieParser=require('cookie-parser');

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch(()=>console.log("Databse not connected"));

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

const port=8080;
app.use('/',require('./routes/authRoutes'));


app.listen(port,()=>
{
    console.log(`App is listening to ${port}`);
})