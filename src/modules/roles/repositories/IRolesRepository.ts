import Profile from '@modules/profiles/typeorm/entities/Profile';
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';
import IFindRoleDTO from '../dtos/IFindRoleDTO';
import Role from '../typeorm/entities/Role';

export default interface IRolesRepository {
  create(date: ICreateRoleDTO): Promise<Role>;
  findById(id: string): Promise<Role | undefined>;
  findByIds(ids: string[]): Promise<Role[]>;
  find(date: IFindRoleDTO): Promise<Role[]>;
  save(role: Role): Promise<Role>;
  delete(role: Role): Promise<void>;
}
