import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';

const app = express();

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.LIVE_URL ||5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{
    console.log("Database connection successful...");
}).catch((error)=>console.log(error));

app.use("/api/user", route);


app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
});