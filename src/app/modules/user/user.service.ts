import { User } from './user.model';

// ekta student made korlam
const createStudentIntoDB = async (studentData: TStudent) => {
  // ---------------------------------------
  //check is user have with self made statics method
  //   if (await Student.isUserExists(studentData.id)) {
  //     throw new Error('User already exists!');
  //   }
  // ---------------------------------------

  const result = await User.create(studentData); // built in static method

  // ---------------------------------------

  // const student = new Student(studentData); // create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!');
  // }

  // const result = await student.save(); // built in instance method

  return result;
};

export const UserService = {
  createStudentIntoDB,
};
