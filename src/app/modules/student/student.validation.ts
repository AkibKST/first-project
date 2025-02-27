import { z } from 'zod';

// Zod Schema for create UserName
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'Name cannot be more than 20 characters' }),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]+$/.test(value), {
    message: 'Last Name must contain only alphabetic characters',
  }),
});

// Zod Schema for create Guardian
const createGuardianValidationSchema = z.object({
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

// Zod Schema for create LocalGuardian
const createLocalGuardianValidationSchema = z.object({
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

// Zod Schema for create Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: createUserNameValidationSchema,
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
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      // profileImg: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

// Zod Schema for update UserName
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'Name cannot be more than 20 characters' })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must contain only alphabetic characters',
    })
    .optional(),
});

// Zod Schema for update Guardian
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  matherName: z.string().optional(),
  matherOccupation: z.string().optional(),
  matherContactNo: z.string().optional(),
});

// Zod Schema for update LocalGuardian
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

// Zod Schema for update Student
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateUserNameValidationSchema.optional(),
        gender: z
          .enum(['male', 'female', 'other'], {
            errorMap: () => ({
              message: "Gender must be either 'male', 'female', or 'other'.",
            }),
          })
          .optional(),
        dateOfBirth: z.string().optional(),
        email: z
          .string()
          .email({ message: 'Email must be a valid email' })
          .optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
            errorMap: () => ({
              message:
                "Blood Group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
            }),
          })
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        profileImg: z.string().optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
      })
      .optional(),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
