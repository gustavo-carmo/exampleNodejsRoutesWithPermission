import { injectable, inject } from 'tsyringe';

import IRolesRepository from '../repositories/IRolesRepository';

import Role from '../typeorm/entities/Role';

interface IRequest {
  name?: string;
  description?: string;
}

@injectable()
class ListRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<Role[]> {
    const roles = await this.rolesRepository.find({ name, description });

    return roles;
  }
}

export default ListRoleService;
