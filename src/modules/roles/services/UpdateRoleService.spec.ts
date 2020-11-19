import AppError from '@shared/errors/AppError';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import UpdateRoleService from './UpdateRoleService';

let fakeRolesRepository: FakeRolesRepository;
let updateRolesService: UpdateRoleService;

describe('UpdateRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();

    updateRolesService = new UpdateRoleService(fakeRolesRepository);
  });

  it('should be able to update role', async () => {
    const role = await fakeRolesRepository.create({
      name: 'São Paulo',
      description: 'SP',
    });

    await updateRolesService.execute({
      id: role.id,
      name: 'Novo Estado',
      description: 'TT',
    });

    expect(role).toHaveProperty('id');
    expect(role.name).toBe('Novo Estado');
    expect(role.description).toBe('TT');
  });

  it('should not to be able to update an inexistent role', async () => {
    await expect(
      updateRolesService.execute({
        id: 'fake-role-id',
        name: 'São Paulo',
        description: 'TT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to update role', async () => {
    await fakeRolesRepository.create({
      name: 'São Paulo',
      description: 'SP',
    });

    const role = await fakeRolesRepository.create({
      name: 'Santa Catarina',
      description: 'SC',
    });

    await expect(
      updateRolesService.execute({
        id: role.id,
        name: 'São Paulo',
        description: 'TT',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      updateRolesService.execute({
        id: role.id,
        name: 'Santa Catarina',
        description: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
