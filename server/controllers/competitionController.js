import asyncHandler from 'express-async-handler';
import Competition from '../models/competitionModel.js';

// @desc    Get all competitions
// @route   GET /api/competitions
// @access  Public
const getCompetitions = asyncHandler(async (req, res) => {
    const competitions = await Competition.find({});
    res.json(competitions);
});

// @desc    Get single competition
// @route   GET /api/competitions/:id
// @access  Public
const getCompetitionById = asyncHandler(async (req, res) => {
    const competition = await Competition.findById(req.params.id);

    if (competition) {
        res.json(competition);
    } else {
        res.status(404);
        throw new Error('Competition not found');
    }
});

// @desc    Create a competition
// @route   POST /api/competitions
// @access  Private/Admin
const createCompetition = asyncHandler(async (req, res) => {
    const competition = new Competition({
        name: 'Sample Competition',
        category: 'CodeQuest',
        user: req.user._id,
        description: 'Sample description',
        registrationFee: 0,
        registrationCount: 0,
    });

    const createdCompetition = await competition.save();
    res.status(201).json(createdCompetition);
});

// @desc    Update a competition
// @route   PUT /api/competitions/:id
// @access  Private/Admin
const updateCompetition = asyncHandler(async (req, res) => {
    const {
        name,
        category,
        description,
        eligibility,
        grades,
        registrationFee,
        startDate,
        endDate,
        registrationDeadline,
        rules,
        prizes,
        status,
        image,
        bannerImage,
    } = req.body;

    const competition = await Competition.findById(req.params.id);

    if (competition) {
        competition.name = name;
        competition.category = category;
        competition.description = description;
        competition.eligibility = eligibility;
        competition.grades = grades;
        competition.registrationFee = registrationFee;
        competition.startDate = startDate;
        competition.endDate = endDate;
        competition.registrationDeadline = registrationDeadline;
        competition.rules = rules;
        competition.prizes = prizes;
        competition.status = status;
        competition.image = image;
        competition.bannerImage = bannerImage;

        const updatedCompetition = await competition.save();
        res.json(updatedCompetition);
    } else {
        res.status(404);
        throw new Error('Competition not found');
    }
});

// @desc    Delete a competition
// @route   DELETE /api/competitions/:id
// @access  Private/Admin
const deleteCompetition = asyncHandler(async (req, res) => {
    const competition = await Competition.findById(req.params.id);

    if (competition) {
        await competition.deleteOne();
        res.json({ message: 'Competition removed' });
    } else {
        res.status(404);
        throw new Error('Competition not found');
    }
});

export {
    getCompetitions,
    getCompetitionById,
    createCompetition,
    updateCompetition,
    deleteCompetition,
};
