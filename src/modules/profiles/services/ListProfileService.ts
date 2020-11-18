import { injectable, inject } from 'tsyringe';

import IProfilesRepository from '../repositories/IProfilesRepository';

import Profile from '../typeorm/entities/Profile';

interface IRequest {
  name?: string;
  description?: string;
}

@injectable()
class ListProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<Profile[]> {
    const profiles = await this.profilesRepository.find({ name, description });

    return profiles;
  }
}

export default ListProfileService;
