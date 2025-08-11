import { Request, Response } from "express";
import * as leadService from "../services/lead.service";
import { handleError } from "../services/error.service";

export async function getAllLeads(req: Request, res: Response) {
    try {
        const leads = await leadService.getAllLeads();
        res.json(leads);
    } catch (err: any) {
        console.error("Error fetching leads:", err);
        handleError(err, res);
    }
}

export async function createLead(req: Request, res: Response) {
    try {
        const { services, ...leadData } = req.body;
        const newLead = await leadService.createLeadWithServices(leadData, services);
        res.status(201).json(newLead);
    } catch (err: any) {
        console.error("Error creating lead:", err);
        handleError(err, res);
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

        return res.status(200).json(lead);

    } catch (err: any) {
        console.error("Error in getLeadById:", err);
        handleError(err, res)
    }
}