/* eslint-disable @typescript-eslint/no-explicit-any */

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
) => {};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {};

const deleteSemesterRegistrationFromDB = async (id: string) => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
