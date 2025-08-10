import { Router } from 'express';
import { getAllLeads, createLead } from '../controllers/lead.controller';

const router = Router();

router.get("/", getAllLeads);
router.get("/:id", getAllLeads);
router.post("/", createLead);

export default router;