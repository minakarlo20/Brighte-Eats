import { Service } from "./service.model";

export interface Lead {
  LeadId?: number;
  Name: string;
  Email: string;
  Mobile: string;
  Postcode: string;
  Services: Service[];
}