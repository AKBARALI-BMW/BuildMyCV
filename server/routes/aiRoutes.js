import express from "express"; 
import protect from "../middlewares/authMiddleware.js"; 
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from "../controler/aiController.js"; // ADDED: .js extension

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, uploadResume);

export default aiRouter;