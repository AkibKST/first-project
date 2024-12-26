import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // step-1: checking if user is exists

  const isUserExists = await User.findOne({ id: payload.id });
  console.log(isUserExists);
  if (!isUserExists) {
    throw new AppError(404, 'This user is not found!');
  }

  //------------------------------------------

  // step-2: checking if user is already deleted

  const isUserAlreadyDeleted = isUserExists?.isDeleted;
  if (isUserAlreadyDeleted) {
    throw new AppError(400, 'This user is already deleted!');
  }

  //------------------------------------------

  // step-3: checking if user is already blocked

  const UserStatus = isUserExists?.status;
  if (UserStatus === 'blocked') {
    throw new AppError(400, 'This user is already blocked!');
  }

  //------------------------------------------

  //step-4: checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExists?.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(400, 'Incorrect Password!');
  }

  //------------------------------------------
  return {};
};

export const AuthServices = {
  loginUser,
};
