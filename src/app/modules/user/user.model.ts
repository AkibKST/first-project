import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { UserStatus } from './user.constant';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      maxlength: [20, 'Password can not be more than 20 character'],
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  // mongoose give us created at and updated at for this timestamps
  {
    timestamps: true,
  },
);

// pre save middleware/hook
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');
  // hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware/hook
// set '' after saving the password
userSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook: we saved data');
  doc.password = '';
  next();
});
//---------------------------------------------------------

//checking if user is exists (with instance statics method)
userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};
//---------------------------------------------------------

//checking if the password is correct
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
//---------------------------------------------------------

//checking if passwordChangedTimestamp(eta jwt issue houer por korte jacchi kina) is gether than jwtIssuedTimestamp(age hoiche kina)
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};
//---------------------------------------------------------

// create model of mongoose by schema
export const User = model<TUser, UserModel>('User', userSchema);
//---------------------------------------------------------
