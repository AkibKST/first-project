import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

//validate middleware
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation
      //   if everything allright next() ->
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequest;
