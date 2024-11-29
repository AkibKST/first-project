const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body; // name alias

    const zodParseData = StudentValidationSchema.parse(studentData);

    // will call service func to send this data
    const result = await UserServices.createStudentIntoDB(zodParseData);

    // // console.log(error, value);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error,
    //   });
    // }

    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};
