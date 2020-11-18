import ICreateProfileDTO from '../dtos/ICreateProfileDTO';
import IFindProfileDTO from '../dtos/IFindProfileDTO';
import Profile from '../typeorm/entities/Profile';

export default interface IProfilesRepository {
  create(date: ICreateProfileDTO): Promise<Profile>;
  findById(id: string): Promise<Profile | undefined>;
  find(date: IFindProfileDTO): Promise<Profile[]>;
  save(profile: Profile): Promise<Profile>;
  delete(profile: Profile): Promise<void>;
}
