import User from "../models/userModel.js"
import { v4 as uuidv4 } from 'uuid';


export const saveData = async (req, res) => {
    try {
        const { username, is_premium } = req.body;
        const name = req.body.first_name;
        const rcvdRefferalCode = req.body.referrerId;
        

        // Check if user already exists
        const userExist = await User.findOne({ username });
        if (userExist) { return res.status(400).json({ message: "User already exists" }); }

        const linkOwner = await User.findOne({ refferalCode: rcvdRefferalCode });
        if (!linkOwner) { return res.status(404).json({ message: 'Incorrect Refferal Code.' }); }

        // creating a new user
        const refferalCode = uuidv4();
        const refferalLink = `https://t.me/gi_bubble_blaster_bot/run?startapp=${refferalCode}`;
        const newUser = await User.create({
            name,
            username,
            is_premium,
            refferalCode,
            refferalLink
        });

        // Updating refferal link Owner
        linkOwner.joinedViaLink.push(newUser.username);
        if (is_premium === 'yes') { linkOwner.coins += 20000; }
        else { linkOwner.coins += 5000; }

        await linkOwner.save();
        return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

export const saveCoins = async (req, res) => {
    try {
        const { username, coins } = req.body;
        const userFound = await User.findOne({ username });
        if (!userFound) {
            return res.status(404).json({ message: "User not found" });
        }

        userFound.coins = coins + userFound.coins;
        await userFound.save();
        res.status(200).json({ userFound });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const findCoins = async (req, res) => {
    try {
        const { username } = req.body;
        const userFound = await User.findOne({ username });
        if (!userFound) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ coins: userFound.coins });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const findUser = async (req, res) => {
    try {
        const { username } = req.body;
        const userFound = await User.findOne({ username });
        if (userFound) {
            return res.status(200).json({ isRegistered: true });
        } else {
            return res.status(200).json({ isRegistered: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


export const findUserDetails = async (req, res) => {
    try {
        const { username } = req.body;
        const userFound = await User.findOne({ username });
        if (userFound) {
            return res.status(200).json({ userFound: userFound });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


export const saveTask = async (req, res) => {
    try {
        const { username, taskName } = req.body;
        const userFound = await User.findOne({ username });
        if (!userFound) {
            return res.status(404).json({ message: "User not found" });
        }

        // check taskName exists in user or not, if taskName exists send -> Your Task is already completed
        if (userFound.taskName.includes(taskName)) {
            return res.status(200).json({ message: "Your Task is already completed" });
        }

        // If taskName exists in user or not, if taskName exists send -> Your Task is already completed
        if (userFound.taskName.includes(taskName)) {
            return res.status(200).json({ message: "Your Task is already completed" });
        }

        // If not, add taskName + 1000 coins to user Schema
        userFound.taskName.push(taskName);
        userFound.coins += 1000;
        await userFound.save();
        res.status(200).json({ message: "Points collected" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

