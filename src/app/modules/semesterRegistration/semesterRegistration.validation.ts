import { z } from 'zod';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({}),
});

const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({}),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
