import mongoose from 'mongoose';

async function connectToDB() {
    if (mongoose.connection.readyState >= 1) {
        console.log('Already connected to the database.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL as string);

        console.log('Connected to DB');
    } catch (error) {
        console.error('Failed to connect to DB:', error);
    }
}

export default connectToDB;