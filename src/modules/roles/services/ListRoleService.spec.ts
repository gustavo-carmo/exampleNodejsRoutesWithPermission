import FakeRolesRepository from '../repositories/fakes/FakeRolesRepository';
import ListRoleService from './ListRoleService';

let fakeRolesRepository: FakeRolesRepository;
let listRolesService: ListRoleService;

describe('ListRole', () => {
  beforeEach(() => {
    fakeRolesRepository = new FakeRolesRepository();

    listRolesService = new ListRoleService(fakeRolesRepository);
  });

  it('should be able to list roles', async () => {
    const role1 = await fakeRolesRepository.create({
      name: 'São Paulo',
      description: 'SP',
    });

    const role2 = await fakeRolesRepository.create({
      name: 'Santa Catarina',
      description: 'SC',
    });

    const roles = await listRolesService.execute({});

    expect(roles).toEqual([role1, role2]);
    // TODO CREATE TESTS TO VALIDATE THE LIKE
  });
});
