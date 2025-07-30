import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Category } from './schema/category.schema';
import { Model } from 'mongoose';

describe('CategoryService', () => {
  let service: CategoryService;
  let model: Model<Category>;

  beforeEach(async () => {
    const mockSave = jest.fn();
    const mockCategoryModel = jest.fn(() => ({
      save: mockSave,
    }));
    // Ak používaš getModelToken, použi ho tu namiesto stringu
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: 'CategoryModel',
          useValue: mockCategoryModel,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    model = module.get<Model<Category>>('CategoryModel');
    (model as any).mockImplementation = mockCategoryModel;
    (model as any).mockSave = mockSave;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoryDto = {
      name: 'Test Category',
      description: 'Test Description',
    };
    const createdCategory = { _id: '1', ...createCategoryDto };

    (model as any).mockSave.mockResolvedValue(createdCategory);

    (model as any).mockImplementation.mockReturnValue({
      save: (model as any).mockSave,
    });

    (service as any).categoryModel = (model as any).mockImplementation;

    const result = await service.create(createCategoryDto);
    expect(result).toEqual(createdCategory);
    expect((model as any).mockSave).toHaveBeenCalled();
  });

  it('should find all categories', async () => {
    const categories = [
      { _id: '1', name: 'Category 1', description: 'Description 1' },
      { _id: '2', name: 'Category 2', description: 'Description 2' },
    ];
    (model as any).find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(categories),
    });
    const result = await service.findAll();
    expect(result).toEqual(categories);
    expect((model as any).find).toHaveBeenCalled();
  });

  it('should find a category by id', async () => {
    const category = {
      _id: '1',
      name: 'Category 1',
      description: 'Description 1',
    };
    (model as any).findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(category),
    });
    const result = await service.findOne('1');
    expect(result).toEqual(category);
    expect((model as any).findById).toHaveBeenCalledWith('1');
  });

  it('should update a category', async () => {
    const updateCategoryDto = {
      name: 'Updated Category',
      description: 'Updated Description',
    };
    const updatedCategory = { _id: '1', ...updateCategoryDto };

    (model as any).findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(updatedCategory),
    });

    const result = await service.update('1', updateCategoryDto);
    expect(result).toEqual(updatedCategory);
    expect((model as any).findByIdAndUpdate).toHaveBeenCalledWith(
      '1',
      updateCategoryDto,
      { new: true },
    );
  });

  it('should remove a category', async () => {
    const categoryId = '1';
    (model as any).findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(null),
    });
    const result = await service.remove(categoryId);
    expect(result).toBeNull();
    expect((model as any).findByIdAndDelete).toHaveBeenCalledWith(categoryId);
  });
});
