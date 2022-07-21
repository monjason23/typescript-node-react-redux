import mongoose from "mongoose";
import { config } from './config';

const connectToDb = async () => {
    try {
        const response = await mongoose.connect(config.mongo.uri);
        console.log(`Mongoose connected to ${response.connection.host}`)
    } catch (err) {
        console.log(err)
        process.exit(1);
    }
}
export default connectToDb;