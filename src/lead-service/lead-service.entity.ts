import { Entity, Column, ManyToOne, JoinColumn, Unique, PrimaryColumn } from 'typeorm';
import { LeadEntity } from '../leads/leads.entity';
import { ServiceEntity } from '../services/services.entity';

@Entity('LeadService')
@Unique(['LeadId', 'ServiceId'])
export class LeadServiceEntity {
  @PrimaryColumn()
  LeadId: number;

  @PrimaryColumn()
  ServiceId: number;

  @ManyToOne(() => LeadEntity, (lead) => lead.LeadServices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'LeadId' })
  Lead: LeadEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.LeadServices, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ServiceId' })
  Service: ServiceEntity;
}