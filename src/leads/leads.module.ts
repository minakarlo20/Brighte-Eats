import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from './leads.entity';
import { LeadService } from './lead.service';
import { LeadsResolver } from './leads.resolver';
import { LeadServiceEntity } from 'src/lead-service/lead-service.entity';
import { ServiceEntity } from 'src/services/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity, LeadServiceEntity, ServiceEntity])], // Registers Leads entity + repository
  providers: [LeadService, LeadsResolver],
  exports: [LeadService], // if another module needs it
})
export class LeadsModule { }