import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRolesRepository from '../repositories/IRolesRepository';

import Role from '../typeorm/entities/Role';

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(id: string): Promise<Role | undefined> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError('Role not found.');
    }

    return role;
  }
}

export default UpdateRoleService;
