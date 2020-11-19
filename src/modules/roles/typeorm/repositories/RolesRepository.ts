import { getRepository, Like, Repository } from 'typeorm';

import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import IRolesRepository from '@modules/roles/repositories/IRolesRepository';

import Role from '@modules/roles/typeorm/entities/Role';
import IFindRoleDTO from '@modules/roles/dtos/IFindRoleDTO';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findById(id: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return role;
  }

  public async find({ name, description }: IFindRoleDTO): Promise<Role[]> {
    const queryParams = {};

    if (name) {
      Object.assign(queryParams, { name: Like(`%${name}%`) });
    }

    if (description) {
      Object.assign(queryParams, { description: Like(`%${description}%`) });
    }

    const roles = await this.ormRepository.find({
      where: queryParams,
    });

    return roles;
  }

  public async findByIds(ids: string[]): Promise<Role[]> {
    const roles = await this.ormRepository.findByIds(ids);

    return roles;
  }

  public async create({ name, description }: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create({
      name,
      description,
    });

    await this.ormRepository.save(role);

    return role;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return role;
  }

  public async save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }

  public async delete(role: Role): Promise<void> {
    await this.ormRepository.remove(role);
  }
}

export default RolesRepository;
