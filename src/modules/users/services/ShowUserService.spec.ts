import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserService from './ShowUserService';

let fakeUsersRepository: FakeUsersRepository;
let showUsersService: ShowUserService;

describe('ShowUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUsersService = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to show user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User Test',
      email: 'user@test.com',
    });

    const userRecovered = await showUsersService.execute(user.id);

    expect(userRecovered).toHaveProperty('id');
    expect(user.name).toBe('User Test');
    expect(user.email).toBe('user@test.com');
  });

  it('should not to be able to show an inexistent user', async () => {
    await expect(
      showUsersService.execute('fake-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
