import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Service } from '../services/services.model';

@ObjectType()
export class LeadServiceType {
  @Field(() => Int)
  LeadId: number;

  @Field(() => Int)
  ServiceId: number;

  @Field(() => Service, { nullable: true })
  Service?: Service;
}