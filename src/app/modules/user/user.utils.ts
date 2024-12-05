import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  const currentId = (0).toString();

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
