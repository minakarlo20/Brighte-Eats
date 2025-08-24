import { ObjectType, Field, Int } from '@nestjs/graphql';
import { LeadServiceType } from '../../lead-service/lead-service.model';
import { Service } from 'src/services/services.model';

@ObjectType('Lead')
export class Lead {
  @Field(() => Int)
  LeadId: number;

  @Field()
  Name: string;

  @Field()
  Email: string;

  @Field()
  Mobile: string;

  @Field()
  Postcode: string;

  @Field({ nullable: true })
  CreatedAt?: Date;

  @Field({ nullable: true })
  UpdatedAt?: Date;

  @Field(() => [Service], { nullable: true })
  Services?: Service[];
}