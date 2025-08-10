import { Request, Response } from "express";
import * as leadService from "../services/lead.service";

export async function getAllLeads(req: Request, res: Response) {
    try {
        const leads = await leadService.getAllLeads();
        res.json(leads);
    } catch (err) {
        console.error("Error fetching leads:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function createLead(req: Request, res: Response) {
    try {
        const { services, ...leadData } = req.body;
        const newLead = await leadService.createLeadWithServices(leadData, services);
        res.status(201).json(newLead);
    } catch (err) {
        console.error("Error creating lead:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function getLeadById(req: Request, res: Response) {
    try {
        if (!req.params.id) {
            return res.status(400).json({ message: "Lead ID is required" });
        }

        const leadId = parseInt(req.params.id, 10);

        if (isNaN(leadId)) {
            return res.status(400).json({ message: "Invalid lead ID" });
        }

        const lead = await leadService.getLeadWithServices(leadId);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        res.json(lead);
    } catch (error) {
        console.error("Error in getLeadById:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}