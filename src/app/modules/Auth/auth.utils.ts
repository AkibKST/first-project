import jwt, { JwtPayload } from 'jsonwebtoken';

//create token function
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
//--------------------------------------

//verify token function
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
//--------------------------------------
