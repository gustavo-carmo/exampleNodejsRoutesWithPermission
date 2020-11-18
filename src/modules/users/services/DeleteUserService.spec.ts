import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUsersService: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    deleteUsersService = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able to delete user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'São Paulo',
      email: 'SP',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Santa Catarina',
      email: 'SC',
    });

    await deleteUsersService.execute(user.id);

    const users = await fakeUsersRepository.find({});

    expect(users).toEqual(expect.arrayContaining([user2]));
  });

  it('should not be able to delete an inexistent user', async () => {
    await expect(
      deleteUsersService.execute('fake-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
