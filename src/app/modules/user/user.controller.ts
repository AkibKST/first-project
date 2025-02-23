import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

//create student controller
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body; // name alias

  // will call service func to send this data
  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});
//------------------------------

//create faculty controller
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});
//------------------------------

//create admin controller
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});
//------------------------------

//create get me controller
const getMe = catchAsync(async (req, res) => {
  const result = await UserServices.getMe(req.headers.authorization as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile is retrieved successfully',
    data: result,
  });
});
//------------------------------

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
