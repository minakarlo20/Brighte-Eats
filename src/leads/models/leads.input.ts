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

    @Field(() => Date, { nullable: true })
    CreatedAt?: Date;

    @Field(() => Date, { nullable: true })
    UpdatedAt?: Date;
}
