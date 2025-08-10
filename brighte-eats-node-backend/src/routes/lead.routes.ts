import { Router } from 'express';
import { getLeads } from '../controllers/lead.controller';

const router = Router();

router.get('/', getLeads);

export default router;