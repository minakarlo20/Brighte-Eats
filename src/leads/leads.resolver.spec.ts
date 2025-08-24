import { Test, TestingModule } from '@nestjs/testing';
import { LeadsResolver } from './leads.resolver';
import { LeadService } from './lead.service';
import { Lead } from './leads.entity';

describe('LeadsResolver', () => {
  let resolver: LeadsResolver;
  let service: LeadService;

  const mockLead = {
    LeadId: 1,
    Name: 'John Doe',
    Email: 'john@example.com',
    Mobile: '0999999999',
    Postcode: '1234',
    CreatedAt: new Date(),
    UpdatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsResolver,
        {
          provide: LeadService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockLead]),
            findOne: jest.fn().mockResolvedValue(mockLead),
            create: jest.fn().mockResolvedValue(mockLead),
          },
        },
      ],
    }).compile();

    resolver = module.get<LeadsResolver>(LeadsResolver);
    service = module.get<LeadService>(LeadService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return all leads', async () => {
    const result = await resolver.getAllLeads();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockLead]);
  });

  it('should return a lead by id', async () => {
    const result = await resolver.getLeadById(1);
    expect(service.findOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockLead);
  });

  it('should create a new lead', async () => {
    const input = {
      Name: 'John Doe',
      Email: 'john@example.com',
      Mobile: '0999999999',
      Postcode: '1234',
    };

    const result = await resolver.createLead(input as any);
    expect(service.create).toHaveBeenCalledWith(input);
    expect(result).toEqual(mockLead);
  });
});
