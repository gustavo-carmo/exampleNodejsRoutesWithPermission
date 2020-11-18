import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ListUserService from './ListUserService';

let fakeUsersRepository: FakeUsersRepository;
let listUsersService: ListUserService;

describe('ListUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listUsersService = new ListUserService(fakeUsersRepository);
  });

  it('should be able to list users', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'São Paulo',
      email: 'SP',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Santa Catarina',
      email: 'SC',
    });

    const users = await listUsersService.execute({});

    expect(users).toEqual([user1, user2]);
    // TODO CREATE TESTS TO VALIDATE THE LIKE
  });
});
