import { z } from 'zod';

// Months Enum
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

// Zod Validation Schema
export const createAcademicSemesterValidationSchema = z.object({
  name: z.string().nonempty('Name is required'),
  year: z.string().regex(/^\d{4}$/, 'Year must be a valid 4-digit year'),
  code: z.string().nonempty('Code is required'),
  startMonth: z.enum(months, { required_error: 'Start Month is required' }),
  endMonth: z.enum(months, { required_error: 'End Month is required' }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
