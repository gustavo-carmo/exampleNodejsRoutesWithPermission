import AppError from '@shared/errors/AppError';
import FakeProfilesRepository from '../repositories/fakes/FakeProfilesRepository';
import DeleteProfileService from './DeleteProfileService';

let fakeProfilesRepository: FakeProfilesRepository;
let deleteProfilesService: DeleteProfileService;

describe('DeleteProfile', () => {
  beforeEach(() => {
    fakeProfilesRepository = new FakeProfilesRepository();

    deleteProfilesService = new DeleteProfileService(fakeProfilesRepository);
  });

  it('should be able to delete profile', async () => {
    const profile = await fakeProfilesRepository.create({
      name: 'São Paulo',
      description: 'SP',
    });

    const profile2 = await fakeProfilesRepository.create({
      name: 'Santa Catarina',
      description: 'SC',
    });

    await deleteProfilesService.execute(profile.id);

    const profiles = await fakeProfilesRepository.find({});

    expect(profiles).toEqual(expect.arrayContaining([profile2]));
  });

  it('should not be able to delete an inexistent profile', async () => {
    await expect(
      deleteProfilesService.execute('fake-profile-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
