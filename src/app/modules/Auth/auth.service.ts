import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './Auth.interface';

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
  return {};
};

export const AuthServices = {
  loginUser,
};
