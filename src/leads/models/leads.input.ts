import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class LeadsInput {
    @Field(() => String)
    Name: string;

    @Field(() => String)
    Email: string;

    @Field(() => String)
    Mobile: string;

    @Field(() => String)
    Postcode: string;

    @Field(() => [Int], { nullable: true })
    ServiceIds?: number[];
}
