import dotenv from 'dotenv';

dotenv.config();

declare global {
    namespace Express {
        export interface Request {
            user?: any,
            token?: string
        }
    }
}


const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@nodemongots.pmujdqv.mongodb.net/test`
const TOKEN_JWT = process.env.SECRET_JWT || "devtoken";

const SERVER_PORT = process.env.SERVER_PORT || 5200;

export const config = {
    mongo: {
        uri: MONGO_URI
    },
    server: {
        port: SERVER_PORT,
        token: TOKEN_JWT
    }
}