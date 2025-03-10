import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

// Login User service

const loginUser = async (payload: TLoginUser) => {
  // step-1: checking if user is exists (with instance statics method)
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(404, 'This user is not found!');
  }

  //------------------------------------------

  // step-2: checking if user is already deleted

  const isUserAlreadyDeleted = user?.isDeleted;
  if (isUserAlreadyDeleted) {
    throw new AppError(400, 'This user is already deleted!');
  }

  //------------------------------------------

  // step-3: checking if user is already blocked

  const UserStatus = user?.status;
  if (UserStatus === 'blocked') {
    throw new AppError(400, 'This user is already blocked!');
  }

  //------------------------------------------

  //step-4: checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(400, 'Incorrect Password!');
  }

  //------------------------------------------

  //create token and send to the client

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
  //-----------------------------------------
};

//----------------------------------

//change password service

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }
  //----------------------------------------------

  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(401, 'This user is deleted !');
  }
  //----------------------------------------------

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(401, 'This user is blocked ! !');
  }
  //----------------------------------------------

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(401, 'Password do not matched');
  //----------------------------------------------

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );
  //----------------------------------------------

  //update password by id and add password changed at
  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  //----------------------------------------------
  return null;
};

//create refresh token and set it
const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(403, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked ! !');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(401, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

//------------------------------------

//forget password and send reset link services
const forgetPassword = async (id: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(403, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked ! !');
  }

  // create access token
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  // create reset UI Link

  const resetUILink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`;
  //-----------------------

  // send reset link to user email
  sendEmail(user.email, resetUILink);
  //-----------------------------
};
//------------------------------------

//reset password service
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resetPassword = async (id: string, newPassword: string, token: any) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(id);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(403, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked ! !');
  }

  // checking if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (decoded.userId !== id) {
    throw new AppError(401, 'You are forbidden !');
  }
  //--------------------------------

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  // update password by id
  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
};
//------------------------------------

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
