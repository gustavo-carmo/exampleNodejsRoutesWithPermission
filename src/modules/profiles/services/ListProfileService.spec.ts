import FakeProfilesRepository from '../repositories/fakes/FakeProfilesRepository';
import ListProfileService from './ListProfileService';

let fakeProfilesRepository: FakeProfilesRepository;
let listProfilesService: ListProfileService;

describe('ListProfile', () => {
  beforeEach(() => {
    fakeProfilesRepository = new FakeProfilesRepository();

    listProfilesService = new ListProfileService(fakeProfilesRepository);
  });

  it('should be able to list profiles', async () => {
    const profile1 = await fakeProfilesRepository.create({
      name: 'São Paulo',
      description: 'SP',
    });

    const profile2 = await fakeProfilesRepository.create({
      name: 'Santa Catarina',
      description: 'SC',
    });

    const profiles = await listProfilesService.execute({});

    expect(profiles).toEqual([profile1, profile2]);
    // TODO CREATE TESTS TO VALIDATE THE LIKE
  });
});
