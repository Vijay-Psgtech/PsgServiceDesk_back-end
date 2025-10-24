import mongoose from 'mongoose';

const institutionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    code: { type: String },
});

const Institution = mongoose.model('Institution', institutionSchema);

export default Institution;