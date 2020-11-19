import AppError from '@shared/errors/AppError';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import CreateRoleService from './CreateRoleService';

let fakeRolesRepository: FakeRolesRepository;
let createRolesService: CreateRoleService;

describe('CreateRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();

    createRolesService = new CreateRoleService(fakeRolesRepository);
  });

  it('should be able to create a new role', async () => {
    const role = await createRolesService.execute({
      name: 'São Paulo',
      description: 'SP',
    });

    expect(role).toHaveProperty('id');
  });

  it('should not be able to create two roles with same name', async () => {
    await createRolesService.execute({
      name: 'São Paulo',
      description: 'SP',
    });

    await expect(
      createRolesService.execute({
        name: 'São Paulo',
        description: 'SC',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two roles with same name', async () => {
    await createRolesService.execute({
      name: 'São Paulo',
      description: 'SP',
    });

    await expect(
      createRolesService.execute({
        name: 'Santa Catarina',
        description: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
