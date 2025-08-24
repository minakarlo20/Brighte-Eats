import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LeadServiceEntity } from '../lead-service/lead-service.entity';
import { ServiceEntity } from '../services/services.entity';

@ObjectType('Lead')
@Entity('Lead')
export class LeadEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  LeadId: number;

  @Field()
  @Column({ length: 100 })
  Name: string;

  @Field()
  @Column({ length: 255 })
  Email: string;

  @Field()
  @Column({ length: 20 })
  Mobile: string;

  @Field()
  @Column({ length: 10 })
  Postcode: string;

  @Field({ nullable: true })
  @Column({ type: 'datetime2', nullable: true })
  CreatedAt?: Date;

  @Field({ nullable: true })
  @Column({ type: 'datetime2' })
  UpdatedAt?: Date;

  @OneToMany(() => LeadServiceEntity, (leadService) => leadService.Lead, { cascade: true })
  LeadServices: LeadServiceEntity[];
}