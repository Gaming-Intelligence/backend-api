import User from "../models/userModel.js"
import { v4 as uuidv4 } from 'uuid';


export const saveData = async (req, res) => {
    try {
        const {username, is_premium} = req.body;
        const name = req.body.first_name;
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
            refferalCode,
            refferalLink
        });

        res.status(200).json(newUser);
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({error: error.message});
    }
}

export const saveCoins = async (req, res) => {
    try {
        const {username, coins} = req.body;
        const userFound = await User.findOne({username}); 
        if(!userFound){
            return res.status(404).json({message: "User not found"});
        }

        userFound.coins = coins + userFound.coins;
        await userFound.save();
        res.status(200).json({userFound});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


export const findCoins = async (req, res) => {
    try {
        const {username} = req.body;
        const userFound = await User.findOne({username}); 
        if(!userFound){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({coins: userFound.coins});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
