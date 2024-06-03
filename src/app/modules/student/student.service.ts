import { TStudent } from './student.interface';
import { Student } from './student.model';

// ekta student made korlam
const createStudentIntoDB = async (studentData: TStudent) => {
  // ---------------------------------------
  //check is user have with self made statics method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  // ---------------------------------------

  const result = await Student.create(studentData); // built in static method

  // ---------------------------------------

  // const student = new Student(studentData); // create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!');
  // }

  // const result = await student.save(); // built in instance method

  return result;
};

// all student database thake niye aslam
const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

// get a single student with param id
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.find({ id });
  return result;
};

// delete a single student with param id
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
