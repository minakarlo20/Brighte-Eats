import { RequestError } from 'mssql';
import sql, { poolPromise } from '../config/db.config';
import { Lead } from '../models/lead.model';
import { Service } from '../models/service.model';
import { createDuplicateNameError } from "../managers/errors.manager";


// Get all Leads with their Services
export async function getAllLeads(): Promise<Lead[]> {
    const pool = await poolPromise;
    const result = await pool.request()
        .query(`
      SELECT l.LeadId, l.Name, l.Email, l.Mobile, l.Postcode,
             s.ServiceId, s.ServiceName
      FROM Lead l
      LEFT JOIN LeadService ls ON l.LeadId = ls.LeadId
      LEFT JOIN Service s ON s.ServiceId = ls.ServiceId
    `);

    const leadsMap = new Map<number, Lead>();

    for (const row of result.recordset) {
        if (!leadsMap.has(row.LeadId)) {
            leadsMap.set(row.LeadId, {
                LeadId: row.LeadId,
                Name: row.Name,
                Email: row.Email,
                Mobile: row.Mobile,
                Postcode: row.Postcode,
                Services: []
            });
        }

        if (row.ServiceId) {
            const service: Service = {
                ServiceId: row.ServiceId,
                ServiceName: row.ServiceName
            };
            leadsMap.get(row.LeadId)!.Services.push(service);
        }
    }

    return Array.from(leadsMap.values());
}

// Get lead with services using Id
export async function getLeadWithServices(leadId: number): Promise<Lead | null> {
    const pool = await poolPromise;
    const result = await pool.request()
        .input("LeadId", leadId)
        .query(`
      SELECT l.LeadId, l.Name, l.Email, l.Mobile, l.Postcode,
             s.ServiceId, s.ServiceName
      FROM Lead l
      LEFT JOIN LeadService ls ON l.LeadId = ls.LeadId
      LEFT JOIN Service s ON s.ServiceId = ls.ServiceId
      WHERE l.LeadId = @LeadId
    `);

    if (result.recordset.length === 0) {
        return null;
    }

    const record = result.recordset[0];

    const lead: Lead = {
        LeadId: record.LeadId,
        Name: record.Name,
        Email: record.Email,
        Mobile: record.Mobile,
        Postcode: record.Postcode,
        Services: []
    };

    for (const row of result.recordset) {
        if (row.ServiceId) {
            const service: Service = {
                ServiceId: row.ServiceId,
                ServiceName: row.ServiceName
            };
            lead.Services.push(service);
        }
    }

    return lead;
}


// Create a Lead and link to services
export async function createLeadWithServices(
    leadData: Omit<Lead, "LeadId">,
    serviceIds: number[]
): Promise<Lead> {
    const pool = await poolPromise;
    const transaction = new sql.Transaction(pool);

    try {
        await transaction.begin();

        const leadResult = await new sql.Request(transaction)
            .input("Name", leadData.Name)
            .input("Email", leadData.Email)
            .input("Mobile", leadData.Mobile)
            .input("Postcode", leadData.Postcode)
            .query(`
        INSERT INTO Lead (Name, Email, Mobile, Postcode)
        OUTPUT INSERTED.*
        VALUES (@Name, @Email, @Mobile, @Postcode)
      `);

        const lead = leadResult.recordset[0];

        for (const serviceId of serviceIds) {
            await new sql.Request(transaction)
                .input("LeadId", lead.LeadId)
                .input("ServiceId", serviceId)
                .query(`
          INSERT INTO LeadService (LeadId, ServiceId)
          VALUES (@LeadId, @ServiceId)
        `);
        }

        const serviceResult = await new sql.Request(transaction)
            .query(`
        SELECT ServiceId, ServiceName
        FROM Service
        WHERE ServiceId IN (${serviceIds.join(",")})
      `);

        const services: Service[] = serviceResult.recordset;

        await transaction.commit();

        return {
            ...lead,
            Services: services
        };
    } catch (err) {
        await transaction.rollback();

        if (err instanceof RequestError && (err.number === 2627 || err.number === 2601)) {
            throw createDuplicateNameError(leadData.Name);
        }

        throw err;
    }
}