import mongoose from 'mongoose';

const competitionSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: [
                'CodeQuest',
                'RoboQuest Jr',
                'RoboQuest Sr',
                'STEMpreneur',
                'Astropreneur',
            ],
            required: true,
        },
        description: {
            type: String,
        },
        eligibility: {
            type: String,
        },
        grades: [Number],
        registrationFee: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
        },
        endDate: {
            type: Date,
        },
        registrationDeadline: {
            type: Date,
        },
        rules: [String],
        prizes: [
            {
                position: String,
                prize: String,
                amount: Number,
            },
        ],
        status: {
            type: String,
            enum: ['upcoming', 'ongoing', 'completed'],
            default: 'upcoming',
        },
        image: {
            type: String,
        },
        bannerImage: {
            type: String,
        },
        registrationCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Competition = mongoose.model('Competition', competitionSchema);

export default Competition;
