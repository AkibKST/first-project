import express from 'express';

const router = express.Router();

//will call controller func
router.post('/create-student', UserControllers.createStudent);

export const UserRoutes = router;
