import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import { OAuth2Client } from 'google-auth-library';

// Initialize Google OAuth client with enhanced debugging
let client;
if (process.env.GOOGLE_CLIENT_ID) {
    console.log('✅ Google OAuth Client ID loaded successfully');
    console.log('   Client ID:', process.env.GOOGLE_CLIENT_ID.substring(0, 20) + '...');
    client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
} else {
    console.error('❌ GOOGLE_CLIENT_ID not found in environment variables');
    console.error('   Make sure server/.env exists with: GOOGLE_CLIENT_ID=...');
    console.error('   Restart the server after adding/changing .env file');
    console.error('   Google OAuth will not work until this is configured');
}

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, school, grade } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        school,
        grade,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            school: user.school,
            grade: user.grade,
            avatar: user.avatar,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.school = req.body.school || user.school;
        user.grade = req.body.grade || user.grade;
        user.avatar = req.body.avatar || user.avatar;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Google Auth (Login/Register)
// @route   POST /api/auth/google
// @access  Public
const googleAuth = asyncHandler(async (req, res) => {
    const { tokenId } = req.body;

    if (!tokenId) {
        res.status(400);
        throw new Error('Google token is required');
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
        res.status(500);
        throw new Error('Google OAuth not configured on server. Please set GOOGLE_CLIENT_ID in server/.env');
    }

    if (!client) {
        res.status(500);
        throw new Error('Google OAuth client not initialized. Please restart the server after setting GOOGLE_CLIENT_ID');
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { name, email, picture, email_verified } = ticket.getPayload();

        if (!email_verified) {
            res.status(400);
            throw new Error('Email not verified by Google');
        }

        let user = await User.findOne({ email });

        if (user) {
            // User exists -> Login
            // Update user info if needed
            if (!user.avatar && picture) {
                user.avatar = picture;
            }
            if (!user.isGoogleAuth) {
                user.isGoogleAuth = true;
            }
            await user.save();

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                avatar: user.avatar || picture,
            });
        } else {
            // User doesn't exist -> Register
            // Create user without password for Google OAuth users
            user = await User.create({
                name,
                email,
                avatar: picture,
                isGoogleAuth: true,
                // phone and password are optional for Google OAuth users
            });

            if (user) {
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id),
                    avatar: user.avatar,
                });
            } else {
                res.status(400);
                throw new Error('Invalid user data');
            }
        }
    } catch (error) {
        if (error.message.includes('Token used too early') || error.message.includes('Token expired')) {
            res.status(401);
            throw new Error('Google token expired. Please try again.');
        }
        if (error.message.includes('Invalid token')) {
            res.status(401);
            throw new Error('Invalid Google token');
        }
        throw error;
    }
});

export { authUser, registerUser, getUserProfile, updateUserProfile, googleAuth };
