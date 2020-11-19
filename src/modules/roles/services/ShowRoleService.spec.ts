import AppError from '@shared/errors/AppError';
import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import ShowRoleService from './ShowRoleService';

let fakeRolesRepository: FakeRolesRepository;
let showRolesService: ShowRoleService;

describe('ShowRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();

    showRolesService = new ShowRoleService(fakeRolesRepository);
  });

  it('should be able to show role', async () => {
    const role = await fakeRolesRepository.create({
      name: 'Role Test',
      description: 'role@test.com',
    });

    const roleRecovered = await showRolesService.execute(role.id);

    expect(roleRecovered).toHaveProperty('id');
    expect(role.name).toBe('Role Test');
    expect(role.description).toBe('role@test.com');
  });

  it('should not to be able to show an inexistent role', async () => {
    await expect(
      showRolesService.execute('fake-role-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
