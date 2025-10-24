import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin', 'agent', 'user'], default: 'user' },
    isActive: { type: Boolean, default: true },
    institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;