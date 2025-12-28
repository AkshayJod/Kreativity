import mongoose from 'mongoose';

const registrationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        competition: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Competition',
            required: true,
        },
        registrationType: {
            type: String,
            enum: ['student', 'school'],
            required: true,
            default: 'student',
        },
        // Student registration fields
        teamName: {
            type: String,
            required: function() {
                return this.registrationType === 'student';
            },
        },
        teamMembers: [
            {
                name: String,
                grade: Number,
                school: String,
                role: String,
            },
        ],
        school: {
            type: String,
        },
        contactEmail: {
            type: String,
        },
        contactPhone: {
            type: String,
        },
        // School registration fields
        schoolName: {
            type: String,
            required: function() {
                return this.registrationType === 'school';
            },
        },
        schoolContactPerson: {
            type: String,
            required: function() {
                return this.registrationType === 'school';
            },
        },
        schoolContactEmail: {
            type: String,
            required: function() {
                return this.registrationType === 'school';
            },
        },
        schoolContactPhone: {
            type: String,
            required: function() {
                return this.registrationType === 'school';
            },
        },
        schoolAddress: {
            type: String,
        },
        // Bulk students for school registration
        bulkStudents: {
            type: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    grade: {
                        type: Number,
                        required: true,
                    },
                    email: String,
                    phone: String,
                    parentName: String,
                    parentEmail: String,
                    parentPhone: String,
                },
            ],
            default: [],
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
        paymentId: {
            type: String,
        },
        paymentAmount: {
            type: Number,
        },
        submissionLink: {
            type: String,
        },
        projectTitle: {
            type: String,
        },
        status: {
            type: String,
            enum: [
                'registered',
                'submitted',
                'qualified',
                'rejected',
                'winner',
            ],
            default: 'registered',
        },
    },
    {
        timestamps: true,
    }
);

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
