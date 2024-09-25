import mongoose from "mongoose";

const videoCodeSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model("videoCode", videoCodeSchema);