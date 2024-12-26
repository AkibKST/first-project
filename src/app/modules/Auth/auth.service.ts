import { TLoginUser } from './Auth.interface';

const loginUser = async (payload: TLoginUser) => {
  console.log(payload);
  return {};
};

export const AuthServices = {
  loginUser,
};
