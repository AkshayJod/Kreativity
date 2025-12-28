import asyncHandler from 'express-async-handler';
import Registration from '../models/registrationModel.js';
import Competition from '../models/competitionModel.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Register for a competition (Student or School)
// @route   POST /api/registrations
// @access  Private
const createRegistration = asyncHandler(async (req, res) => {
    const {
        competitionId,
        registrationType = 'student',
        teamName,
        teamMembers,
        school,
        contactEmail,
        contactPhone,
        // School registration fields
        schoolName,
        schoolContactPerson,
        schoolContactEmail,
        schoolContactPhone,
        schoolAddress,
        bulkStudents,
        paymentId,
        paymentAmount,
    } = req.body;

    const competition = await Competition.findById(competitionId);
    if (!competition) {
        res.status(404);
        throw new Error('Competition not found');
    }

    // Validate registration type
    if (!['student', 'school'].includes(registrationType)) {
        res.status(400);
        throw new Error('Invalid registration type. Must be "student" or "school"');
    }

    // Build registration object based on type
    const registrationData = {
        user: req.user._id,
        competition: competitionId,
        registrationType,
        paymentId,
        paymentStatus: 'completed', // Mocking payment success for now
    };

    if (registrationType === 'student') {
        // Student registration
        if (!teamName || !teamMembers || !contactEmail || !contactPhone) {
            res.status(400);
            throw new Error('Missing required fields for student registration');
        }
        registrationData.teamName = teamName;
        registrationData.teamMembers = teamMembers;
        registrationData.school = school;
        registrationData.contactEmail = contactEmail;
        registrationData.contactPhone = contactPhone;
        registrationData.paymentAmount = paymentAmount || competition.registrationFee;
        // Don't include bulkStudents for student registrations
    } else {
        // School registration
        if (!schoolName || !schoolContactPerson || !schoolContactEmail || !schoolContactPhone || !bulkStudents || bulkStudents.length === 0) {
            res.status(400);
            throw new Error('Missing required fields for school registration');
        }
        registrationData.schoolName = schoolName;
        registrationData.schoolContactPerson = schoolContactPerson;
        registrationData.schoolContactEmail = schoolContactEmail;
        registrationData.schoolContactPhone = schoolContactPhone;
        registrationData.schoolAddress = schoolAddress;
        registrationData.bulkStudents = bulkStudents;
        // Calculate total payment amount for bulk registration
        registrationData.paymentAmount = (paymentAmount || competition.registrationFee) * bulkStudents.length;
    }

    const registration = new Registration(registrationData);
    const createdRegistration = await registration.save();

    // Increment registration count (count students for school registrations)
    const studentCount = registrationType === 'school' ? bulkStudents.length : 1;
    competition.registrationCount = (competition.registrationCount || 0) + studentCount;
    await competition.save();

    // Send confirmation email
    try {
        const emailAddress = registrationType === 'school' ? schoolContactEmail : contactEmail;
        const subject = `Registration Confirmed: ${competition.name}`;
        let message;
        
        if (registrationType === 'school') {
            message = `Your school "${schoolName}" has successfully registered ${bulkStudents.length} student(s) for ${competition.name}. Good luck!`;
        } else {
            message = `You have successfully registered for ${competition.name}. Team: ${teamName}. Good luck!`;
        }
        
        await sendEmail({
            email: emailAddress,
            subject,
            message,
        });
    } catch (error) {
        console.error('Email send failed:', error);
        // Don't fail the request if email fails
    }

    res.status(201).json(createdRegistration);
});

// @desc    Get user's registrations
// @route   GET /api/registrations/user
// @access  Private
const getUserRegistrations = asyncHandler(async (req, res) => {
    const registrations = await Registration.find({ user: req.user._id })
        .populate('competition', 'name category startDate image')
        .sort({ createdAt: -1 });
    res.json(registrations);
});

// @desc    Get registration by ID
// @route   GET /api/registrations/:id
// @access  Private
const getRegistrationById = asyncHandler(async (req, res) => {
    const registration = await Registration.findById(req.params.id)
        .populate('user', 'name email')
        .populate('competition', 'name category registrationFee');

    if (registration) {
        // Only admin or the user who registered can view
        if (
            req.user.role === 'admin' ||
            registration.user._id.toString() === req.user._id.toString()
        ) {
            res.json(registration);
        } else {
            res.status(401);
            throw new Error('Not authorized to view this registration');
        }
    } else {
        res.status(404);
        throw new Error('Registration not found');
    }
});

// @desc    Update registration (e.g., submit project)
// @route   PUT /api/registrations/:id
// @access  Private
const updateRegistration = asyncHandler(async (req, res) => {
    const registration = await Registration.findById(req.params.id);

    if (registration) {
        if (registration.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized');
        }

        registration.submissionLink = req.body.submissionLink || registration.submissionLink;
        registration.projectTitle = req.body.projectTitle || registration.projectTitle;
        registration.status = req.body.status || registration.status;

        const updatedRegistration = await registration.save();
        res.json(updatedRegistration);
    } else {
        res.status(404);
        throw new Error('Registration not found');
    }
});

// @desc    Bulk register students for a competition (School registration)
// @route   POST /api/registrations/bulk
// @access  Private
const createBulkRegistration = asyncHandler(async (req, res) => {
    const {
        competitionId,
        schoolName,
        schoolContactPerson,
        schoolContactEmail,
        schoolContactPhone,
        schoolAddress,
        bulkStudents,
        paymentId,
    } = req.body;

    const competition = await Competition.findById(competitionId);
    if (!competition) {
        res.status(404);
        throw new Error('Competition not found');
    }

    if (!bulkStudents || !Array.isArray(bulkStudents) || bulkStudents.length === 0) {
        res.status(400);
        throw new Error('At least one student is required for bulk registration');
    }

    // Validate all students have required fields
    for (const student of bulkStudents) {
        if (!student.name || !student.grade) {
            res.status(400);
            throw new Error('Each student must have a name and grade');
        }
    }

    const registration = new Registration({
        user: req.user._id,
        competition: competitionId,
        registrationType: 'school',
        schoolName,
        schoolContactPerson,
        schoolContactEmail,
        schoolContactPhone,
        schoolAddress,
        bulkStudents,
        paymentId,
        paymentAmount: competition.registrationFee * bulkStudents.length,
        paymentStatus: 'completed', // Mocking payment success for now
    });

    const createdRegistration = await registration.save();

    // Increment registration count by number of students
    competition.registrationCount = (competition.registrationCount || 0) + bulkStudents.length;
    await competition.save();

    // Send confirmation email
    try {
        await sendEmail({
            email: schoolContactEmail,
            subject: `Bulk Registration Confirmed: ${competition.name}`,
            message: `Your school "${schoolName}" has successfully registered ${bulkStudents.length} student(s) for ${competition.name}. Total amount: ₹${competition.registrationFee * bulkStudents.length}. Good luck!`,
        });
    } catch (error) {
        console.error('Email send failed:', error);
        // Don't fail the request if email fails
    }

    res.status(201).json(createdRegistration);
});

// @desc    Get all school registrations
// @route   GET /api/registrations/school
// @access  Private (Admin or School user)
const getSchoolRegistrations = asyncHandler(async (req, res) => {
    const registrations = await Registration.find({ registrationType: 'school' })
        .populate('user', 'name email')
        .populate('competition', 'name category startDate image')
        .sort({ createdAt: -1 });
    
    res.json(registrations);
});

export {
    createRegistration,
    createBulkRegistration,
    getUserRegistrations,
    getRegistrationById,
    updateRegistration,
    getSchoolRegistrations,
};
