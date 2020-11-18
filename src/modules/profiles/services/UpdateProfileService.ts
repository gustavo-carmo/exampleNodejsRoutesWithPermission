import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProfilesRepository from '../repositories/IProfilesRepository';

import Profile from '../typeorm/entities/Profile';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
  }: IRequest): Promise<Profile | undefined> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new AppError('Profile not found.');
    }

    // TODO - Change this find to a findByName - The generic find, search by like and we need validate if the name is exactly the same
    let profiles = await this.profilesRepository.find({
      name,
    });

    const profileWithName = profiles.length ? profiles[0] : null;

    if (profileWithName && String(profileWithName.id) !== String(id)) {
      throw new AppError('Profile name already in use.');
    }

    // TODO - Change this find to a findByEmail - The generic find, search by like and we need validate if the description is exactly the same
    profiles = await this.profilesRepository.find({
      description,
    });

    const profileWithAbbreviation = profiles.length ? profiles[0] : null;

    if (
      profileWithAbbreviation &&
      String(profileWithAbbreviation.id) !== String(id)
    ) {
      throw new AppError('Profile description already in use.');
    }

    Object.assign(profile, { name, description });

    await this.profilesRepository.save(profile);

    return profile;
  }
}

export default UpdateProfileService;
