import { getRepository, Like, Repository } from 'typeorm';

import ICreateProfileDTO from '@modules/profiles/dtos/ICreateProfileDTO';
import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';

import Profile from '@modules/profiles/typeorm/entities/Profile';
import IFindProfileDTO from '@modules/profiles/dtos/IFindProfileDTO';

class ProfilesRepository implements IProfilesRepository {
  private ormRepository: Repository<Profile>;

  constructor() {
    this.ormRepository = getRepository(Profile);
  }

  public async findById(id: string): Promise<Profile | undefined> {
    const profile = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return profile;
  }

  public async find({ name, description }: IFindProfileDTO): Promise<Profile[]> {
    const queryParams = {};

    if (name) {
      Object.assign(queryParams, { name: Like(`%${name}%`) });
    }

    if (description) {
      Object.assign(queryParams, { description: Like(`%${description}%`) });
    }

    const profiles = await this.ormRepository.find({
      where: queryParams,
    });

    return profiles;
  }

  public async create({ name, description }: ICreateProfileDTO): Promise<Profile> {
    const profile = this.ormRepository.create({
      name,
      description,
    });

    await this.ormRepository.save(profile);

    return profile;
  }

  public async findByName(name: string): Promise<Profile | undefined> {
    const profile = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return profile;
  }

  public async save(profile: Profile): Promise<Profile> {
    return this.ormRepository.save(profile);
  }

  public async delete(profile: Profile): Promise<void> {
    await this.ormRepository.remove(profile);
  }
}

export default ProfilesRepository;
