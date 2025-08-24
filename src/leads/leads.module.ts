import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './leads.entity';
import { LeadService } from './lead.service';
import { LeadsResolver } from './leads.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])], // Registers Leads entity + repository
  providers: [LeadService, LeadsResolver],
  exports: [LeadService], // if another module needs it
})
export class LeadsModule {}