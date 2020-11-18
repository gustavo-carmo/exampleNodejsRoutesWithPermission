import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProfilesRepository from '../repositories/IProfilesRepository';

import Profile from '../typeorm/entities/Profile';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({
    name,
    description,
  }: IRequest): Promise<Profile | undefined> {
    // TODO - Change this find to a findByName - The generic find, search by like and we need validate if the name is exactly the same
    let profiles = await this.profilesRepository.find({ name });
    let checkProfileExists = profiles.length ? profiles[0] : null;

    if (checkProfileExists) {
      throw new AppError('Profile already created.');
    }

    // TODO - Change this find to a findByEmail - The generic find, search by like and we need validate if the description is exactly the same
    profiles = await this.profilesRepository.find({ description });
    checkProfileExists = profiles.length ? profiles[0] : null;

    if (checkProfileExists) {
      throw new AppError('Profile already created.');
    }

    const profile = await this.profilesRepository.create({
      name,
      description,
    });

    return profile;
  }
}

export default CreateProfileService;
