import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Lead {
    @Field(() => Int)
    LeadId: number;

    @Field(() => String)
    Name: string;

    @Field(() => String)
    Email: string;
    
    @Field(() => String)
    Mobile: string;

    @Field(() => String)
    Postcode: string;

    @Field(() => Date)
    CreatedAt: Date;

    @Field(() => Date)
    UpdatedAt: Date;
}
