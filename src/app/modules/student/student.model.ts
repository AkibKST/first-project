import { Schema, model, connect } from 'mongoose';
import { Student } from './student.interface';

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  gender: ['male', 'female'], //enum type
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    matherName: { type: String, required: true },
    matherOccupation: { type: String, required: true },
    matherContactNo: { type: String, required: true },
  },
  localGuardian: {
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
  },
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});
