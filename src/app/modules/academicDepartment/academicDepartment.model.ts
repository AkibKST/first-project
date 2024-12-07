import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  // mongoose give us created at and updated at for this timestamps
  {
    timestamps: true,
  },
);

// pre save middleware
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExits = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExits) {
    throw new Error('This department is already exits!');
  }

  next();
});

//query middleware
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExits = AcademicDepartment.findOne(query);

  if (!isDepartmentExits) {
    throw new Error('This department does not exits!');
  }

  next();
});

// create model of mongoose by schema
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
