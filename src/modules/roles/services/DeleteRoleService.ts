import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { ObjectID } from 'mongodb';
import IRolesRepository from '../repositories/IRolesRepository';

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError('Role not found.');
    }

    await this.rolesRepository.delete(role);
  }
}

export default CreateRoleService;
