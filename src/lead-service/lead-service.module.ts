import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadServiceEntity } from './lead-service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([LeadServiceEntity])]
})
export class LeadServiceModule { }
