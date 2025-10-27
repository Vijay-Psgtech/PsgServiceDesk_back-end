import Institution from '../models/institutionModel.js';

// Get all institutions
export const getAllInstitutions = async (req, res) => {
    try{
        const institutions = await Institution.find();
        res.status(200).json(institutions);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Create new institution
export const createInstitution = async (req, res) => {
    try{
        const newInstitution = new Institution(req.body);
        const nameExists = await Institution.findOne({ name: newInstitution.name });
        if (nameExists) {
            return res.status(400).json({ messgae : "Institution name already exists" });
        }
        const savedInstitution = await newInstitution.save();
        res.status(201).json(savedInstitution);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}