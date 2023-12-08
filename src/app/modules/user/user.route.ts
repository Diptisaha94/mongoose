import express from 'express'
import { userController } from './user.controller';
const router= express.Router();

router.post('/create-user', userController.createUser);
router.get('/', userController.getUser);
router.get('/:userId', userController.getsingleUser);
router.put('/:userId', userController.getUserAndUpdate);
router.delete('/:userId', userController.userDelete)

export const userRoutes = router