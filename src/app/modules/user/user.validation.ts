import { z } from 'zod';

// Zod validation schema for User model
const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters.' })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
