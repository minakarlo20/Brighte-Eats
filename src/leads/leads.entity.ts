import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Lead') // GraphQL type
@Entity('Lead') // Table name in MSSQL
export class Lead {
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
  @CreateDateColumn({ type: 'datetime2', nullable: true })
  CreatedAt?: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ type: 'datetime2' })
  UpdatedAt?: Date;
}