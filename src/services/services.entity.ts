import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LeadServiceEntity } from '../lead-service/lead-service.entity';

@Entity('Service')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  ServiceId: number;

  @Column({ length: 100 })
  ServiceName: string;

  @OneToMany(() => LeadServiceEntity, (leadService) => leadService.Service)
  LeadServices: LeadServiceEntity[];
}