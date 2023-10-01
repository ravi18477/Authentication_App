import express from 'express';
import connection from './db.js';
import dotenv from 'dotenv';
import router from './Routes/routes.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/",router);

app.get("/",(req,res)=>{
    res.send("Hello Ravi");
})
app.get("/contact",(req,res)=>{
    res.cookie("test","ravi");
    res.send("Welcome to contact");
})

const port=4000;

app.listen(port,(req,res)=>{
    console.log(`Your server is running at port ${port}`);
})

const URL_DB=process.env.URL_DB;



connection(URL_DB);


