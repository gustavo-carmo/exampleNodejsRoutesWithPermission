import AppError from '@shared/errors/AppError';
import FakeProfilesRepository from '../repositories/fakes/FakeProfilesRepository';
import ShowProfileService from './ShowProfileService';

let fakeProfilesRepository: FakeProfilesRepository;
let showProfilesService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeProfilesRepository = new FakeProfilesRepository();

    showProfilesService = new ShowProfileService(fakeProfilesRepository);
  });

  it('should be able to show profile', async () => {
    const profile = await fakeProfilesRepository.create({
      name: 'Profile Test',
      description: 'profile@test.com',
    });

    const profileRecovered = await showProfilesService.execute(profile.id);

    expect(profileRecovered).toHaveProperty('id');
    expect(profile.name).toBe('Profile Test');
    expect(profile.description).toBe('profile@test.com');
  });

  it('should not to be able to show an inexistent profile', async () => {
    await expect(
      showProfilesService.execute('fake-profile-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
