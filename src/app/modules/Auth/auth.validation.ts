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

// Refresh token validation schema
const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});
//---------------------------------

// forget password validation schema
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User id is required!' }),
  }),
});
//---------------------------------

// reset password validation schema
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'User id is required!' }),
    newPassword: z.string({ required_error: 'User id is required!' }),
  }),
});
//---------------------------------

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
