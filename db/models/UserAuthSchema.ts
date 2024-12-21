import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const userAuthModel = mongoose.models.UserAuth || mongoose.model('UserAuth', userAuthSchema);

export default userAuthModel;