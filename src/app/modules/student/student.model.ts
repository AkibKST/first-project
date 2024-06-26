import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { nextTick } from 'process';

// Sub-schema for UserName
const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1); //Akib
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

// Sub-schema for Guardian
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, 'Father Name is required'] },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
  },
  matherName: { type: String, required: [true, 'Mother Name is required'] },
  matherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  matherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
  },
});

// Sub-schema for LocalGuardian
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian Name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
  },
});

// Main Student Schema
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],

    maxlength: [20, 'Password can not be more than 20 charactrer'],
  },
  name: { type: UserNameSchema, required: [true, 'Name is required'] },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: "Gender must be either 'male', 'female', or 'other'.",
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String, required: [true, 'Date of Birth is required'] },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not e valid email type',
    },
  },
  contactNo: { type: String, required: [true, 'Contact Number is required'] },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency Contact Number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:
        "Blood Group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
    },
  },
  presentAddress: {
    type: String,
    required: [true, 'Present Address is required'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent Address is required'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian information is required'],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: "Status must be either 'active' or 'blocked'.",
    },
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre save middleware/hook
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');
  // hashing password and save into DB
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware/hook
studentSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook: we saved data');

  doc.password = '';
  next();
});

// Query Middleware

studentSchema.pre('find', function (next) {
  console.log(this);
  next();
});

//creating a static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

// Create Student Model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
