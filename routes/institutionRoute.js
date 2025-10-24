import express from 'express';
import { getAllInstitutions, createInstitution } from '../controllers/institutionController.js';

const router = express.Router();

//Route to get all institutions
router.get('/', getAllInstitutions);

// Route to create a new institution
router.post('/save', createInstitution);

export default router;