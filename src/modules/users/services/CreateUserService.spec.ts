import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUsersService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUsersService = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUsersService.execute({
      name: 'São Paulo',
      email: 'SP',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with same name', async () => {
    await createUsersService.execute({
      name: 'São Paulo',
      email: 'SP',
    });

    await expect(
      createUsersService.execute({
        name: 'São Paulo',
        email: 'SC',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two users with same name', async () => {
    await createUsersService.execute({
      name: 'São Paulo',
      email: 'SP',
    });

    await expect(
      createUsersService.execute({
        name: 'Santa Catarina',
        email: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
