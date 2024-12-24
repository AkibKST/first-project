/* eslint-disable @typescript-eslint/no-explicit-any */

import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  // step 1
  // check if the semester is exists

  const academicSemester = payload?.academicSemester;

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(404, 'This academic semester not found!');
  }
  // ----------------------------------

  // step 2
  // check if the semester already registration?

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(400, 'This semester is already registered!');
  }
  // -------------------------------------------

  // step 3
  // check if there any registered semester that  is already 'UPCOMING' | 'ONGOING'?

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      400,
      `This semester is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`,
    );
  }
  // -------------------------------------------

  // step 4
  // create semester registration data with this model
  const result = await SemesterRegistration.create(payload);
  return result;
  // -------------------------------------------
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  // step 1
  // get all semester data or search , sort, filter, pagination and limit with QueryBuilder

  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;

  // ----------------------------------
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  // step 1
  // get single semester data with params id

  const result = await SemesterRegistration.findById(id);

  return result;
  // ----------------------------------
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // step 1
  // check if the requested registered is exists
  const isRequestedRegistrationExists = await SemesterRegistration.findById(id);

  if (!isRequestedRegistrationExists) {
    throw new AppError(404, 'This semester is NOT Found!');
  }
  // ---------------------------------------

  // step 2
  // if the requested semester registration is ended, we will not update anything
  const currentSemesterStatus = isRequestedRegistrationExists?.status;

  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      404,
      `This semester is already ${currentSemesterStatus} !`,
    );
  }
  // ----------------------------------

  // step 3
  // UPCOMING --> ONGOING --> ENDED
  const requestedStatus = payload?.status;

  // UPCOMING TO ENDED korte debo nah
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      404,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}!`,
    );
  }
  // ----------------------------------

  // step 4
  // UPCOMING --> ONGOING --> ENDED

  // ONGOING TO UPCOMING korte debo nah

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      404,
      `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}!`,
    );
  }
  // ----------------------------------

  // step 5
  // UPDATE data model by id

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;

  // ----------------------------------
};

const deleteSemesterRegistrationFromDB = async () => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
