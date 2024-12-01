import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true,
    },
    emailAddress: {
        type: String,
        required: true,
    }
});

const User = mongoose.models.userSchema || mongoose.model("User", userSchema);

export default User;