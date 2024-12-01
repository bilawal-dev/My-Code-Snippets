import mongoose from "mongoose";

async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log('Connected To DB');
    } catch (error) {
        console.log('Failed To Connect To DB', error);
    }
};

export default connectToDB;