import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: false
    },
    username:{
        type: String,
        required: true
    },
    is_premium:{
        type: Boolean,
        required: true
    },
    coins:{
        type: Number,
        default: 14400,
        required: true,
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
    }
})

export default mongoose.model("users", userSchema);