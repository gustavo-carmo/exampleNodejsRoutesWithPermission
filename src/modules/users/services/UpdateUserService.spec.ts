import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let updateUsersService: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    updateUsersService = new UpdateUserService(fakeUsersRepository);
  });

  it('should be able to update user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'São Paulo',
      email: 'SP',
    });

    await updateUsersService.execute({
      id: user.id,
      name: 'Novo Estado',
      email: 'TT',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Novo Estado');
    expect(user.email).toBe('TT');
  });

  it('should not to be able to update an inexistent user', async () => {
    await expect(
      updateUsersService.execute({
        id: 'fake-user-id',
        name: 'São Paulo',
        email: 'TT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to update user', async () => {
    await fakeUsersRepository.create({
      name: 'São Paulo',
      email: 'SP',
    });

    const user = await fakeUsersRepository.create({
      name: 'Santa Catarina',
      email: 'SC',
    });

    await expect(
      updateUsersService.execute({
        id: user.id,
        name: 'São Paulo',
        email: 'TT',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      updateUsersService.execute({
        id: user.id,
        name: 'Santa Catarina',
        email: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
