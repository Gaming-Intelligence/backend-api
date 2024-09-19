import mongoose from "mongoose";
import { MAX } from "uuid";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    is_premium:{
        type: String,
        required: true
    },
    coins:{
        type: Number,
        default: 11123
    },
    keys: {
        type: Number,
        default: 3,
        max: 10
    },
    refferalCode: {
        type: String,
        unique: true,
        required: true
    },
    refferalLink: {
        type: String,
        unique: true,
        required: true
    },
    joinedViaLink: {
        type: [
            {
                type: String,
                required: true
            }
        ]
    },
    taskName: [ {type: String} ]
});

export default mongoose.model("users", userSchema);