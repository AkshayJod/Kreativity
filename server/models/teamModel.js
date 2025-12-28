import mongoose from 'mongoose';

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    logo: {
        type: String,
        required: false,
        default: 'https://cdn-icons-png.flaticon.com/512/4509/4509747.png' // Default placeholder
    },
    description: {
        type: String,
        required: true,
    },
    achievements: [{
        type: String
    }],
    isRecruiting: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Team = mongoose.model('Team', teamSchema);
export default Team;
