import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
  //instance methods interface for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
  //--------------------------------------------------

  //instance methods interface for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  //--------------------------------------------------

  //instance methods interface for checking if jwt issued before password changed
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
  //--------------------------------------------------
}

export type TUserRole = keyof typeof USER_ROLE;
