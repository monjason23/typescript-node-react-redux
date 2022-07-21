import { NextFunction, Request, Response, RequestHandler } from "express";

export const testServer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: "Working!" })
}
