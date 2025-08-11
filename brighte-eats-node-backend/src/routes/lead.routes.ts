import { Router } from 'express';
import { getAllLeads, createLead, getLeadById } from '../controllers/lead.controller';

const router = Router();

router.get("/", getAllLeads);
router.get("/:id", getLeadById);
router.post("/", createLead);

export default router;