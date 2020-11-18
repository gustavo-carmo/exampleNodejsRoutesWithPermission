import AppError from '@shared/errors/AppError';
import FakeProfilesRepository from '../repositories/fakes/FakeProfilesRepository';
import CreateProfileService from './CreateProfileService';

let fakeProfilesRepository: FakeProfilesRepository;
let createProfilesService: CreateProfileService;

describe('CreateProfile', () => {
  beforeEach(() => {
    fakeProfilesRepository = new FakeProfilesRepository();

    createProfilesService = new CreateProfileService(fakeProfilesRepository);
  });

  it('should be able to create a new profile', async () => {
    const profile = await createProfilesService.execute({
      name: 'São Paulo',
      description: 'SP',
    });

    expect(profile).toHaveProperty('id');
  });

  it('should not be able to create two profiles with same name', async () => {
    await createProfilesService.execute({
      name: 'São Paulo',
      description: 'SP',
    });

    await expect(
      createProfilesService.execute({
        name: 'São Paulo',
        description: 'SC',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create two profiles with same name', async () => {
    await createProfilesService.execute({
      name: 'São Paulo',
      description: 'SP',
    });

    await expect(
      createProfilesService.execute({
        name: 'Santa Catarina',
        description: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
