import User from "../models/userModel.js"
import { v4 as uuidv4 } from 'uuid';


export const saveData = async (req, res) => {
    try {
        const {name, username, is_premium, coins} = req.body;
        const userExist = await User.findOne({username});
        if(userExist) {
            return res.status(400).json({message: "User already exists"});
        }
        
        const refferalCode = uuidv4();
        const refferalLink = `https://t.me/gi_bubble_blaster_bot/run?startapp=${refferalCode}`;
        
        const newUser = await User.create({
            name,
            username,
            is_premium,
            coins,
            refferalCode,
            refferalLink
        });

        res.status(200).json(newUser);
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({error: error.message});
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(users.length === 0){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"});
    }
}

