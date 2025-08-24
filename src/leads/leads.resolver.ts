import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { LeadService } from './lead.service';
import { Lead } from './models/leads.model';
import { LeadsInput } from './models/leads.input';

@Resolver(() => Lead)
export class LeadsResolver {
    constructor(private readonly leadService: LeadService) { }

    @Query(() => [Lead])
    getAllLeads() {
        return this.leadService.findAll();
    }

    @Query(() => Lead)
    getLeadById(@Args('LeadId', { type: () => Int }) LeadId: number) {
        return this.leadService.findOne(LeadId);
    }

    @Mutation(() => Lead)
    createLead(@Args('input') input: LeadsInput) {
        return this.leadService.create(input);
    }
}