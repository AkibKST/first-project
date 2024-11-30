import config from '../../config';
import { TStudent } from '../student/student.interface';
import { User } from './user.model';

// ekta student made korlam
const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  type NewUser = {};

  // create a user object
  let user = {};

  // if password is not given, use default password
  user.password = password || (config.default_password as string);

  // set student role
  user.role = 'student';

  // set manually generated id
  user.id = '2030100001';

  // create a user
  const result = await User.create(user); // built in static method

  // create a student
  if (Object.keys(result).length) {
    // set id, _id as user
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
