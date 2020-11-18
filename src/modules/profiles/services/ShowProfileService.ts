import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProfilesRepository from '../repositories/IProfilesRepository';

import Profile from '../typeorm/entities/Profile';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute(id: string): Promise<Profile | undefined> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new AppError('Profile not found.');
    }

    return profile;
  }
}

export default UpdateProfileService;
