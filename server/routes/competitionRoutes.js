import express from 'express';
const router = express.Router();
import {
    getCompetitions,
    getCompetitionById,
    createCompetition,
    updateCompetition,
    deleteCompetition,
} from '../controllers/competitionController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getCompetitions).post(protect, admin, createCompetition);
router
    .route('/:id')
    .get(getCompetitionById)
    .put(protect, admin, updateCompetition)
    .delete(protect, admin, deleteCompetition);

export default router;
