import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// Mock UserService
const mockUserService = {
  findAll: jest.fn(() => [
    { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' },
  ]),
  findOne: jest.fn((id: string) =>
    id === '1'
      ? { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' }
      : null,
  ),
  create: jest.fn((dto) => ({
    id: '2',
    ...dto,
  })),
  update: jest.fn((id, dto) => ({
    id,
    ...dto,
  })),
  remove: jest.fn((id) => ({ deleted: true })),
};

describe.only('UserController', () => {
  let controller: UserController;
  let service: any; // alebo lepšie: jest.Mocked<typeof mockUserService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    const result = await controller.getAllUsers();
    expect(result).toEqual([
      { id: '1', name: 'Test User', email: 'test@example.com', role: 'user' },
    ]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return one user by id', async () => {
    const result = await controller.getUserById('1');
    expect(result).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
    });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a user', async () => {
    const dto = {
      name: 'Updated User',
      email: 'updated@example.com',
      password: 'AB123456',
      role: 'admin',
    };
    const result = await controller.updateUser('1', dto);
    expect(result).toEqual({ id: '1', ...dto });
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a user', async () => {
    const result = await controller.deleteUser('1');
    expect(result).toEqual({ deleted: true });
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
