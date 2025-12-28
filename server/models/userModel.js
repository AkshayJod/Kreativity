import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: function() {
                return !this.isGoogleAuth;
            },
        },
        phone: {
            type: String,
            required: function() {
                return !this.isGoogleAuth;
            },
        },
        isGoogleAuth: {
            type: Boolean,
            default: false,
        },
        school: {
            type: String,
        },
        grade: {
            type: Number,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        avatar: {
            type: String,
        },
        registrations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Registration',
        }],
        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        }],
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    // Skip password hashing if password is not modified or if user is from Google OAuth
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
