import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

describe('ProductController', () => {
  let service: ProductService;
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockReturnValue([]),
            create: jest.fn(),
            findOne: jest.fn().mockReturnValue(null),
            update: jest.fn().mockReturnValue(null),
            remove: jest.fn().mockReturnValue(null),

            // ...mock ďalších metód podľa potreby
          },
        },
      ],
    }).compile();
    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
  it('should return an array from findAll', async () => {
    const result = await controller.findAll();
    expect(Array.isArray(result)).toBe(true);
  });
  it('should call service.create when create is called', async () => {
    const dto = {
      name: 'Test',
      description: 'Test',
      price: 1,
      categoryId: 1,
      stockQuantity: 1,
    };
    await controller.create(dto as any);
    expect(service.create).toHaveBeenCalledWith(dto);
  });
  it('should find a product by id', async () => {
    const id = '6884ad401e1d8be9e5ea4842';
    const result = await controller.findOne(id);
    expect(result).toBeNull();
  });
  it('should update a product', async () => {
    const id = '6884ad401e1d8be9e5ea4842';
    const dto = {
      name: 'Updated',
      description: 'Updated',
      price: 2,
      categoryId: 2,
      stockQuantity: 2,
    };
    const result = await controller.update(id, dto as any);
    expect(result).toBeNull();
  });
  it('should delete a product', async () => {
    const id = '6884ad401e1d8be9e5ea4842';
    const result = await controller.remove(id);
    expect(result).toBeNull();
  });
});
