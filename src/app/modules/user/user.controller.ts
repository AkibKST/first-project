import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body; // name alias

    // const zodParseData = StudentValidationSchema.parse(studentData);

    // will call service func to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // send response
    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created successfully',
    //   data: result,
    // });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createStudent,
};
