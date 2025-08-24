import { Test, TestingModule } from '@nestjs/testing';
import { LeadService } from './lead.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lead } from './leads.entity';
import { Repository } from 'typeorm';

describe('LeadService', () => {
  let service: LeadService;
  let repo: Repository<Lead>;

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
        LeadService,
        {
          provide: getRepositoryToken(Lead),
          useValue: {
            find: jest.fn().mockResolvedValue([mockLead]),
            findOne: jest.fn().mockResolvedValue(mockLead),
            create: jest.fn().mockReturnValue(mockLead),
            save: jest.fn().mockResolvedValue(mockLead),
          },
        },
      ],
    }).compile();

    service = module.get<LeadService>(LeadService);
    repo = module.get<Repository<Lead>>(getRepositoryToken(Lead));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a lead', async () => {
    const input = {
      Name: 'John Doe',
      Email: 'john@example.com',
      Mobile: '0999999999',
      Postcode: '1234',
    };

    const result = await service.create(input as any);
    expect(repo.create).toHaveBeenCalledWith(input);
    expect(repo.save).toHaveBeenCalled();
    expect(result).toEqual(mockLead);
  });
});
