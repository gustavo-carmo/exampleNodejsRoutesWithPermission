import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import IProfilesRepository from '../repositories/IProfilesRepository';

@injectable()
class CreateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const profile = await this.profilesRepository.findById(id);

    if (!profile) {
      throw new AppError('Profile not found.');
    }

    await this.profilesRepository.delete(profile);
  }
}

export default CreateProfileService;
