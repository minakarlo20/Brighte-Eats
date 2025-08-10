import { Request, Response } from 'express';
import * as leadService from '../services/lead.service';

export async function getLeads(req: Request, res: Response) {
    try {
        const leads = await leadService.getAllLeads();
        res.json(leads);
    } catch (err) {
        console.error('Error fetching leads:', err);
        res.status(500).json({ message: 'Error fetching leads' });
    }
}

export async function getLead(req: Request, res: Response) {
    try {
        const lead = await leadService.getLeadWithServices(Number(req.params.id));
        if (!lead) return res.status(404).json({ message: 'Lead not found' });
        res.json(lead);
    } catch (err) {
        console.error('Error fetching lead:', err);
        res.status(500).json({ message: 'Error fetching lead' });
    }
}
