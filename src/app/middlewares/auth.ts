import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

//auth  middleware
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //if the token is sent from client
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }
    //-----------------------------------------------------

    //check if the token is valid

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        //err
        if (err) {
          throw new AppError(401, 'You are not authorized!');
        }

        // check if requiredRoles & decoded roles are valid

        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(401, 'You are not authorized!');
        }
        //--------------------------------------------------

        //decoded
        req.user = decoded as JwtPayload;
        next();
      },
    );
    //----------------------------------------
  });
};

export default auth;
