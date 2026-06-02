import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    }
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;