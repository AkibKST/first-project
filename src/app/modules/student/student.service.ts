import { Student } from './student.model';

// all student database thake niye aslam
const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate('academicDepartment');
  return result;
};

// get a single student with param id
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });

  //use aggregate
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

// delete a single student with param id
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
