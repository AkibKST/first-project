import { z } from 'zod';

// Login validation schema
const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Id is required!' }),
    password: z.string({ required_error: 'Password is required!' }),
  }),
});
//---------------------------------

// Change password validation schema
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});
//---------------------------------

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
};
