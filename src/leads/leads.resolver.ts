import { Query, Resolver, Args, Int, Mutation } from '@nestjs/graphql';
import { Lead } from './models/leads.model';
import { LeadService } from './lead.service';
import { LeadsInput } from './models/leads.input';


@Resolver(() => Lead)
export class LeadsResolver {
    constructor(
        private readonly leadService: LeadService
    ) { }

    @Query(() => [Lead])
    async getAllLeads() {
        return await this.leadService.findAll();
    }

    @Query(() => Lead)
    async getLeadById(
        @Args({ name: 'LeadId', type: () => Int }) LeadId: number
    ) {
        return await this.leadService.findOne(LeadId);
    }

    @Mutation(() => Lead)
    async createLead(
        @Args('input') input: LeadsInput
    ) {
        return await this.leadService.create(input);
    }
}