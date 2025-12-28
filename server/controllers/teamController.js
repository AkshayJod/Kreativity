import asyncHandler from 'express-async-handler';
import Team from '../models/teamModel.js';
import User from '../models/userModel.js';

// @desc    Create a new team
// @route   POST /api/teams
// @access  Private
const createTeam = asyncHandler(async (req, res) => {
    console.log('--- Create Team Request ---');
    console.log('User:', req.user ? req.user._id : 'No User');
    console.log('Body:', req.body);

    const { name, description, logo } = req.body;

    if (!req.user) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const teamExists = await Team.findOne({ name });

    if (teamExists) {
        res.status(400);
        throw new Error('Team name already exists');
    }

    // Handle empty logo string to allow default to trigger
    const teamLogo = logo && logo.trim() !== '' ? logo : undefined;

    try {
        const team = await Team.create({
            name,
            description,
            logo: teamLogo,
            captain: req.user._id,
            members: [req.user._id]
        });
        res.status(201).json(team);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400);
            throw new Error('Team name already exists (Duplicate)');
        } else {
            console.error('Create Team Error:', error); // Log the actual error
            res.status(400);
            throw new Error(error.message || 'Invalid team data');
        }
    }
});

// @desc    Get all teams
// @route   GET /api/teams
// @access  Public
const getTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find({})
        .populate('captain', 'name email')
        .populate('members', 'name email');
    res.json(teams);
});

// @desc    Get team by ID
// @route   GET /api/teams/:id
// @access  Public
const getTeamById = asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id)
        .populate('captain', 'name email')
        .populate('members', 'name email');

    if (team) {
        res.json(team);
    } else {
        res.status(404);
        throw new Error('Team not found');
    }
});

// @desc    Delete team
// @route   DELETE /api/teams/:id
// @access  Private (Captain only)
const deleteTeam = asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id);

    if (team) {
        if (team.captain.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to delete this team');
        }
        await team.deleteOne();
        res.json({ message: 'Team removed' });
    } else {
        res.status(404);
        throw new Error('Team not found');
    }
});

export {
    createTeam,
    getTeams,
    getTeamById,
    deleteTeam
};
