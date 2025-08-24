import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('Service')
export class Service {
  @Field(() => Int)
  ServiceId: number;

  @Field()
  ServiceName: string;
}