import AppError from '@shared/errors/AppError';
import FakeProfilesRepository from '../repositories/fakes/FakeProfilesRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeProfilesRepository: FakeProfilesRepository;
let updateProfilesService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeProfilesRepository = new FakeProfilesRepository();

    updateProfilesService = new UpdateProfileService(fakeProfilesRepository);
  });

  it('should be able to update profile', async () => {
    const profile = await fakeProfilesRepository.create({
      name: 'São Paulo',
      description: 'SP',
    });

    await updateProfilesService.execute({
      id: profile.id,
      name: 'Novo Estado',
      description: 'TT',
    });

    expect(profile).toHaveProperty('id');
    expect(profile.name).toBe('Novo Estado');
    expect(profile.description).toBe('TT');
  });

  it('should not to be able to update an inexistent profile', async () => {
    await expect(
      updateProfilesService.execute({
        id: 'fake-profile-id',
        name: 'São Paulo',
        description: 'TT',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to update profile', async () => {
    await fakeProfilesRepository.create({
      name: 'São Paulo',
      description: 'SP',
    });

    const profile = await fakeProfilesRepository.create({
      name: 'Santa Catarina',
      description: 'SC',
    });

    await expect(
      updateProfilesService.execute({
        id: profile.id,
        name: 'São Paulo',
        description: 'TT',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      updateProfilesService.execute({
        id: profile.id,
        name: 'Santa Catarina',
        description: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
