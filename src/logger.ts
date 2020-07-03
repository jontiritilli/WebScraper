import express from "express";
const Logger = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  console.log(`${request.method}, ${request.path}`);
  next();
};

export default Logger;
