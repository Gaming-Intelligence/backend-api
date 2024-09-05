import mongoose from "mongoose";
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
        required: false
    },
    refferalLink: {
        type: String,
        unique: true,
        required: false
    }
})

export default mongoose.model("users", userSchema);