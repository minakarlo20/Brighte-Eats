import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from './services.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ServiceEntity])]
})
export class ServicesModule {}
