import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import User from "../models/user.model";

interface JwtPayload {
    id: string
}

class AuthMiddleware {
    static protectRoute = async (req: Request, _: Response, next: NextFunction) => {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new Error("Unauthorized");
        }

        const decoded = jwt.verify(token, config.server.token) as JwtPayload;
        const user = await User.findById(decoded.id).select({ password: 0, posts: 0 });

        req.user = user;
        req.token = token;
        next();
    }
}

export default AuthMiddleware;