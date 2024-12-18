import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB(req.query);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  // send response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentFromDB(id, student);

  // send response
  res.status(200).json({
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);

  // send response
  res.status(200).json({
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
