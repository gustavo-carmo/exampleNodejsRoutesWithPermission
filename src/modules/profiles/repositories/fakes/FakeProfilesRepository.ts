import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';

import Profile from '@modules/profiles/typeorm/entities/Profile';
import IFindProfileDTO from '@modules/profiles/dtos/IFindProfileDTO';
import { uuid } from 'uuidv4';

class FakeProfilesRepository implements IProfilesRepository {
  private profiles: Profile[] = [];

  public async create({ name, description }: ICreateProfileDTO): Promise<Profile> {
    const profile = new Profile();

    Object.assign(profile, { id: uuid(), name, description });

    this.profiles.push(profile);

    return profile;
  }

  public async findById(id: string): Promise<Profile | undefined> {
    return this.profiles.find((profile) => profile.id === id);
  }

  public async save(profile: Profile): Promise<Profile> {
    const profileIndex = this.profiles.findIndex(
      (findProfile) => findProfile.id === profile.id,
    );

    this.profiles[profileIndex] = profile;

    return profile;
  }

  public async delete(profile: Profile): Promise<void> {
    const profileIndex = this.profiles.findIndex(
      (findProfile) => findProfile.id === profile.id,
    );

    this.profiles.splice(profileIndex, 1);
  }

  public async find({ name, description }: IFindProfileDTO): Promise<Profile[]> {
    return this.profiles.filter(
      (profile) =>
        (name && profile.name === name) ||
        (description && profile.description === description) ||
        (!name && !description && profile),
    );
  }
}

export default FakeProfilesRepository;
