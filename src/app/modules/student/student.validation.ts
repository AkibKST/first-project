import { z } from 'zod';

// Zod Schema for UserName
const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'Name cannot be more than 20 characters' }),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last Name must contain only alphabetic characters',
  }),
});

// Zod Schema for Guardian
const GuardianValidationSchema = z.object({
  fatherName: z.string().nonempty({ message: 'Father Name is required' }),
  fatherOccupation: z
    .string()
    .nonempty({ message: 'Father Occupation is required' }),
  fatherContactNo: z
    .string()
    .nonempty({ message: 'Father Contact Number is required' }),
  matherName: z.string().nonempty({ message: 'Mother Name is required' }),
  matherOccupation: z
    .string()
    .nonempty({ message: 'Mother Occupation is required' }),
  matherContactNo: z
    .string()
    .nonempty({ message: 'Mother Contact Number is required' }),
});

// Zod Schema for LocalGuardian
const LocalGuardianValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Local Guardian Name is required' }),
  occupation: z
    .string()
    .nonempty({ message: 'Local Guardian Occupation is required' }),
  contactNo: z
    .string()
    .nonempty({ message: 'Local Guardian Contact Number is required' }),
  address: z
    .string()
    .nonempty({ message: 'Local Guardian Address is required' }),
});

// Zod Schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().nonempty({ message: 'Password is required' }).max(20),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: "Gender must be either 'male', 'female', or 'other'.",
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email({ message: 'Email must be a valid email' })
        .nonempty({ message: 'Email is required' }),
      contactNo: z.string().nonempty({ message: 'Contact Number is required' }),
      emergencyContactNo: z
        .string()
        .nonempty({ message: 'Emergency Contact Number is required' }),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({
          message:
            "Blood Group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
        }),
      }),
      presentAddress: z
        .string()
        .nonempty({ message: 'Present Address is required' }),
      permanentAddress: z
        .string()
        .nonempty({ message: 'Permanent Address is required' }),
      guardian: GuardianValidationSchema,
      localGuardian: LocalGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
