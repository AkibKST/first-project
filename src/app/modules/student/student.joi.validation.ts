//creating a schema validation using joi

import Joi from 'joi';

// Joi Schema for UserName
const UserNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, 'capitalize format')
    .messages({
      'string.base': 'First Name must be a string',
      'string.empty': 'First Name is required',
      'string.max': 'First Name cannot be more than 20 characters',
      'string.pattern.base': 'First Name must start with a capital letter',
      'any.required': 'First Name is required',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/, 'alpha')
    .required()
    .messages({
      'string.base': 'Last Name must be a string',
      'string.empty': 'Last Name is required',
      'string.pattern.base':
        'Last Name must contain only alphabetic characters',
      'any.required': 'Last Name is required',
    }),
});

// Joi Schema for Guardian
const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father Name must be a string',
    'string.empty': 'Father Name is required',
    'any.required': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father Occupation must be a string',
    'string.empty': 'Father Occupation is required',
    'any.required': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father Contact Number must be a string',
    'string.empty': 'Father Contact Number is required',
    'any.required': 'Father Contact Number is required',
  }),
  matherName: Joi.string().required().messages({
    'string.base': 'Mother Name must be a string',
    'string.empty': 'Mother Name is required',
    'any.required': 'Mother Name is required',
  }),
  matherOccupation: Joi.string().required().messages({
    'string.base': 'Mother Occupation must be a string',
    'string.empty': 'Mother Occupation is required',
    'any.required': 'Mother Occupation is required',
  }),
  matherContactNo: Joi.string().required().messages({
    'string.base': 'Mother Contact Number must be a string',
    'string.empty': 'Mother Contact Number is required',
    'any.required': 'Mother Contact Number is required',
  }),
});

// Joi Schema for LocalGuardian
const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local Guardian Name must be a string',
    'string.empty': 'Local Guardian Name is required',
    'any.required': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local Guardian Occupation must be a string',
    'string.empty': 'Local Guardian Occupation is required',
    'any.required': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local Guardian Contact Number must be a string',
    'string.empty': 'Local Guardian Contact Number is required',
    'any.required': 'Local Guardian Contact Number is required',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Local Guardian Address must be a string',
    'string.empty': 'Local Guardian Address is required',
    'any.required': 'Local Guardian Address is required',
  }),
});

// Joi Schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
    'any.required': 'ID is required',
  }),
  name: UserNameSchema.required().messages({
    'any.required': 'Name is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': "Gender must be either 'male', 'female', or 'other'.",
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.base': 'Date of Birth must be a string',
    'string.empty': 'Date of Birth is required',
    'any.required': 'Date of Birth is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact Number must be a string',
    'string.empty': 'Contact Number is required',
    'any.required': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency Contact Number must be a string',
    'string.empty': 'Emergency Contact Number is required',
    'any.required': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only':
        "Blood Group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present Address must be a string',
    'string.empty': 'Present Address is required',
    'any.required': 'Present Address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'string.base': 'Permanent Address must be a string',
    'string.empty': 'Permanent Address is required',
    'any.required': 'Permanent Address is required',
  }),
  guardian: guardianSchema.required().messages({
    'any.required': 'Guardian information is required',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'any.required': 'Local Guardian information is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': "Status must be either 'active' or 'blocked'.",
  }),
});

export default studentValidationSchema;
//  ------------------------------------------
