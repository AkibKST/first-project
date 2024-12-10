import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

// all student database thake niye aslam
const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// get a single student with param id
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  //use aggregate
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

//update a student with param id
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const result = await Student.findOneAndUpdate({ id }, payload);

  //use aggregate
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

// delete a single student with param id
const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //creating a static method
    // studentSchema.statics.isIdExists = async function (id: string) {
    //   const existingId = await Student.findOne({ id });
    //   if (!existingId) {
    //     throw new AppError(400, 'Failed Id not valid');
    //   }
    //   return existingId;
    // };

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(400, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(400, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
