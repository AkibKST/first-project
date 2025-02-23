import { z } from 'zod';
import { UserStatus } from './user.constant';

// Zod validation schema for User model
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters.' })
    .optional(),
});
//--------------------------

//change status validation schema
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});
//--------------------------

export const userValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
