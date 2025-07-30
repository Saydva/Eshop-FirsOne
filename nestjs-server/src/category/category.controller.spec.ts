import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoryController', () => {
  let controller: CategoryController;
  let service: CategoryService;

  const mockCategoryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [{ provide: CategoryService, useValue: mockCategoryService }],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const createCategoryDto = {
      name: 'Test Category',
      description: 'Test Description',
    };
    mockCategoryService.create.mockResolvedValue(createCategoryDto);
    const result = await controller.createCategory(createCategoryDto);
    expect(result).toEqual(createCategoryDto);
    expect(mockCategoryService.create).toHaveBeenCalledWith(createCategoryDto);
  });

  it('should find all categories', async () => {
    const categories = [{ name: 'Category 1' }, { name: 'Category 2' }];
    mockCategoryService.findAll.mockResolvedValue(categories);
    const result = await controller.findAllCategories();
    expect(result).toEqual(categories);
    expect(mockCategoryService.findAll).toHaveBeenCalled();
  });

  it('should find a category by id', async () => {
    const category = { id: '1', name: 'Category 1' };
    mockCategoryService.findOne.mockResolvedValue(category);
    const result = await controller.findCategoryById('1');
    expect(result).toEqual(category);
    expect(mockCategoryService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a category', async () => {
    const categoryId = '1';
    const updateCategoryDto = {
      name: 'Updated Category',
      description: 'Test Description',
    };
    const updatedCategory = { ...updateCategoryDto, id: categoryId };
    mockCategoryService.update.mockResolvedValue(updatedCategory);
    const result = await controller.updateCategory(
      categoryId,
      updateCategoryDto,
    );
    expect(result).toEqual(updatedCategory);
    expect(mockCategoryService.update).toHaveBeenCalledWith(
      categoryId,
      updateCategoryDto,
    );
  });

  it('should throw NotFoundException if category not found', async () => {
    mockCategoryService.findOne.mockResolvedValue(null);
    await expect(
      controller.findCategoryById('non-existing-id'),
    ).rejects.toThrow('Category not found');
  });

  it('should delete a category', async () => {
    const categoryId = '1';
    const deletedCategory = { id: categoryId, name: 'ToDelete' };
    mockCategoryService.remove.mockResolvedValue(deletedCategory);

    const result = await controller.deleteCategory(categoryId);
    expect(result).toEqual(deletedCategory);
    expect(mockCategoryService.remove).toHaveBeenCalledWith(categoryId);
  });

  it('should throw NotFoundException if category not found on delete', async () => {
    mockCategoryService.remove.mockResolvedValue(null);

    await expect(controller.deleteCategory('999')).rejects.toThrow(
      'Category not found',
    );
  });
});
