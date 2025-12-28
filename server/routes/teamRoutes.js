import express from 'express';
const router = express.Router();
import {
    createTeam,
    getTeams,
    getTeamById,
    deleteTeam
} from '../controllers/teamController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createTeam).get(getTeams);
router.route('/:id').get(getTeamById).delete(protect, deleteTeam);

export default router;
