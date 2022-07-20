import { NextFunction, Request, Response } from "express";

const requestLog = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Incoming request -> Method:[${req.method}] URL:[${req.url}] IP:[${req.socket.remoteAddress}]`);

    res.on('finish', () => { 
        console.log(`Outgoing request -> Method:[${req.method}] URL:[${req.url}] IP:[${req.socket.remoteAddress}] Status:[${res.statusCode}]`);
    });

    next();
}

export default requestLog;