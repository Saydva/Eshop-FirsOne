import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getModelToken } from '@nestjs/mongoose';

// Mock model
class ProductModelMock {
  constructor(private data: any) {}
  save() {
    return this.data;
  }
  static find() {
    return { exec: () => [] };
  }
  static findById() {
    return { exec: () => null };
  }
  static findByIdAndUpdate() {
    return { exec: () => null };
  }
  static findByIdAndDelete() {
    return { exec: () => null };
  }
}

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken('Product'),
          useValue: ProductModelMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array from findAll', async () => {
    const result = await service.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a product', async () => {
    const dto = {
      name: 'Test',
      description: 'Test',
      price: 1,
      categoryId: 1,
      stockQuantity: 1,
    };
    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
  });

  it('should find a product by id', async () => {
    const id = '123';
    const result = await service.findOne(id);
    expect(result).toBeNull();
  });
  it('should update a product', async () => {
    const id = '123';
    const dto = {
      name: 'Updated',
      description: 'Updated',
      price: 2,
      categoryId: 2,
      stockQuantity: 2,
    };
    const result = await service.update(id, dto as any);
    expect(result).toBeNull();
  });
  it('should delete a product', async () => {
    const id = '123';
    const result = await service.remove(id);
    expect(result).toBeNull();
  });
});
