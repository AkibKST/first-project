import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
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

  return null;
};

//------------------------------------

export const AuthServices = {
  loginUser,
  changePassword,
};
