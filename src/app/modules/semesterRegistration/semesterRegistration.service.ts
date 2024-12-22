/* eslint-disable @typescript-eslint/no-explicit-any */

import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
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
    throw new AppError(404, 'This semester is already registered!');
  }
  // -------------------------------------------

  // step 3
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
  // update single semester data with params id

  return result;
  // ----------------------------------
};

const deleteSemesterRegistrationFromDB = async (id: string) => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
