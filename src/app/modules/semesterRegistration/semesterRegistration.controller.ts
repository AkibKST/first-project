import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // create semester registration with req.body
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration is created successfully!',
      data: result,
    });
  },
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    // get all semester data or search , sort, filter, pagination and limit with req.query
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(
        req.query,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration is retrieved successfully !',
      data: result,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // get single data with find by id

    const { id } = req.params;

    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(
        id,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration is retrieved successfully',
      data: result,
    });
  },
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    // update semester registration with params id
    const { id } = req.params;
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration is updated successfully',
      data: result,
    });
  },
);

const deleteSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = console.log(id);
    //   await ;

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Semester Registration is updated successfully',
      data: result,
    });
  },
);

export const SemesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
