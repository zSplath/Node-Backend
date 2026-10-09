import mongoose from "mongoose";

async function dbConnection() {
    mongoose.connect(process.env.MONGO_CONNECTION);

    return mongoose.connection;
}

export default dbConnection;