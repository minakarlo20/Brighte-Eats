import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeadEntity } from './leads.entity';
import { LeadServiceEntity } from '../lead-service/lead-service.entity';
import { LeadsInput } from './models/leads.input';
import { Lead } from './models/leads.model';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(LeadEntity)
    private readonly leadRepo: Repository<LeadEntity>,

    @InjectRepository(LeadServiceEntity)
    private readonly leadServiceRepo: Repository<LeadServiceEntity>
  ) {}

  async findAll(): Promise<Lead[]> {
    const leads = await this.leadRepo.find({
      relations: ['LeadServices', 'LeadServices.Service'],
    });

    return leads.map(lead => ({
      LeadId: lead.LeadId,
      Name: lead.Name,
      Email: lead.Email,
      Mobile: lead.Mobile,
      Postcode: lead.Postcode,
      CreatedAt: lead.CreatedAt,
      UpdatedAt: lead.UpdatedAt,
      Services: lead.LeadServices?.map(ls => ({
        ServiceId: ls.Service.ServiceId,
        ServiceName: ls.Service.ServiceName,
      })),
    }));
  }

  async findOne(id: number): Promise<Lead | null> {
    const lead = await this.leadRepo.findOne({
      where: { LeadId: id },
      relations: ['LeadServices', 'LeadServices.Service'],
    });

    if (!lead) return null;

    return {
      LeadId: lead.LeadId,
      Name: lead.Name,
      Email: lead.Email,
      Mobile: lead.Mobile,
      Postcode: lead.Postcode,
      CreatedAt: lead.CreatedAt,
      UpdatedAt: lead.UpdatedAt,
      Services: lead.LeadServices?.map(ls => ({
        ServiceId: ls.Service.ServiceId,
        ServiceName: ls.Service.ServiceName,
      })),
    };
  }

  async create(input: LeadsInput): Promise<Lead> {
    const { ServiceIds, ...leadData } = input;

    const savedLead = await this.leadRepo.save(this.leadRepo.create(leadData));

    if (ServiceIds?.length) {
      const leadServices = ServiceIds.map(id =>
        this.leadServiceRepo.create({ LeadId: savedLead.LeadId, ServiceId: id }),
      );
      await this.leadServiceRepo.save(leadServices);
    }

    const leadWithServices = await this.leadRepo.findOne({
      where: { LeadId: savedLead.LeadId },
      relations: ['LeadServices', 'LeadServices.Service'],
    });

    return {
      LeadId: leadWithServices.LeadId,
      Name: leadWithServices.Name,
      Email: leadWithServices.Email,
      Mobile: leadWithServices.Mobile,
      Postcode: leadWithServices.Postcode,
      CreatedAt: leadWithServices.CreatedAt,
      UpdatedAt: leadWithServices.UpdatedAt,
      Services: leadWithServices.LeadServices?.map(ls => ({
        ServiceId: ls.Service.ServiceId,
        ServiceName: ls.Service.ServiceName,
      })),
    };
  }
}