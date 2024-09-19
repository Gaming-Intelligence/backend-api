import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';
import cors from 'cors';
import cron from 'node-cron';
import User from './models/userModel.js';
// import {incrementUserKeys} from './utils/increaseKeys.js';


const app = express();

app.use(bodyParser.json());
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log("Database connection successful...");
}).catch((error) => console.log(error));




// -----------------------------------------------------
// Increment user keys fxn 
const incrementUserKeys = async () => {
    try {
        await User.updateMany({}, { $inc: { keys: 1 } });
        console.log("User keys updated successfully.");
    } catch (error) {
        console.error("Error updating user keys:", error);
    }
};


// Schedule task 
cron.schedule('0 5,11,17,23 * * *', () => { 
    console.log('Running scheduled task to update user keys...'); 
    incrementUserKeys(); 
});  
// cron.schedule('* * * * *', () => { 
//     console.log('Running scheduled task to update user keys...'); 
//     incrementUserKeys(); 
// });  




app.use("/api/user", route);


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});