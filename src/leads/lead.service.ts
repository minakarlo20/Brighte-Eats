import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './leads.entity';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead) private leadRepo: Repository<Lead>,
  ) {}

  findAll(): Promise<Lead[]> {
    return this.leadRepo.find();
  }

  findOne(id: number): Promise<Lead | null> {
    return this.leadRepo.findOneBy({ LeadId: id });
  }

  create(data: Partial<Lead>): Promise<Lead> {
    const lead = this.leadRepo.create(data);
    return this.leadRepo.save(lead);
  }
}