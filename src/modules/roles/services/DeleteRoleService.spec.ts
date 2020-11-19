import AppError from '@shared/errors/AppError';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import DeleteRoleService from './DeleteRoleService';

let fakeRolesRepository: FakeRolesRepository;
let deleteRolesService: DeleteRoleService;

describe('DeleteRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();

    deleteRolesService = new DeleteRoleService(fakeRolesRepository);
  });

  it('should be able to delete role', async () => {
    const role = await fakeRolesRepository.create({
      name: 'São Paulo',
      description: 'SP',
    });

    const role2 = await fakeRolesRepository.create({
      name: 'Santa Catarina',
      description: 'SC',
    });

    await deleteRolesService.execute(role.id);

    const roles = await fakeRolesRepository.find({});

    expect(roles).toEqual(expect.arrayContaining([role2]));
  });

  it('should not be able to delete an inexistent role', async () => {
    await expect(
      deleteRolesService.execute('fake-role-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
