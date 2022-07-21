import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _: Request, res: Response, next: NextFunction) => {
   const statusCode = res.statusCode ? res.statusCode : 500;
   res.status(statusCode);
   res.json({
       message: err.message,
       stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
   })
}

export default errorHandler;