import { Student } from './student.interface';
import { StudentModel } from './student.model';

// ekta student made korlam
const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

// all student database thake niye aslam
const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

// get a single student with param id
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.find({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
