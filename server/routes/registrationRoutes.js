import express from 'express';
const router = express.Router();
import {
    createRegistration,
    createBulkRegistration,
    getUserRegistrations,
    getRegistrationById,
    updateRegistration,
    getSchoolRegistrations,
} from '../controllers/registrationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createRegistration);
router.route('/bulk').post(protect, createBulkRegistration);
router.route('/user').get(protect, getUserRegistrations);
router.route('/school').get(protect, getSchoolRegistrations);
router
    .route('/:id')
    .get(protect, getRegistrationById)
    .put(protect, updateRegistration);

export default router;
