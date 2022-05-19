import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderService } from '../order/order.service';
import { ProductService } from '../product/product.service';
import { Repository } from 'typeorm';
import { CatalogService } from './catalog.service';
import { Catalog } from './entities/catalog.entity';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogService,
        {
          provide: getRepositoryToken(Catalog),
          useClass: Repository,
        },
        {
          provide: ProductService,
          useValue: {
            findByIds: jest.fn(),
          },
        },
        {
          provide: OrderService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
