import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

class UserController {
    private static generateToken = (id: string) => {
        return jwt.sign({ id }, config.server.token, { expiresIn: "30d" })
    }

    static createUser = async (req: Request, res: Response) => {
        const { email, username, password } = req.body;

        if(!email || !password) {
            res.status(400);
            throw new Error('Please provide all necessary info')
        }

        const user = await User.findOne({ email });

        if(user) {
            res.status(400);
            throw new Error("User already exists.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            username,
            password: hashedPassword
        });

        if(newUser) {
            res.status(201)
            res.json({
                _id: newUser.id,
                email: newUser.email,
                username: newUser.username,
                token: this.generateToken(newUser.id)
            })
        } else {
            res.status(400);
            throw new Error("User creation failed");
        }

    }

    static loginUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if(!email || !password) {
            res.status(400);
            throw new Error('Please provide all necessary info')
        }

        const user = await User.findOne({ email });

        if(!user) {
            res.status(400);
            throw new Error("User does not exits");
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if(user && passwordMatched) {
            res.status(201);
            res.json({
                _id: user.id,
                email: user.email,
                username: user.username,
                token: this.generateToken(user.id)                
            })
        } else {
            res.status(400);
            throw new Error("Login failed");
        }
    }

    static getUserDetails = async (req: Request, res: Response) => {
        if(!req.user) {
            res.status(400);
            throw new Error("User details unvailable!")
        }

        res.status(201);
        res.send(req.user)
    }
}




export default UserController;