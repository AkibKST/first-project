import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
// import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

//will call controller func

// create student route access only by admin
router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  // validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
//--------------------------

// create faculty route access only by admin
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);
//--------------------------

// create admin route access only by admin
router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
//--------------------------

//create get me route access by all
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserControllers.getMe,
);
//--------------------------

//change status route access only by admin
router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(userValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);
//--------------------------

export const UserRoutes = router;
