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
        type: String,
        required: true
    },
    coins:{
        type: Number,
        default: 14400
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
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }
        ]
    }
});

export default mongoose.model("users", userSchema);