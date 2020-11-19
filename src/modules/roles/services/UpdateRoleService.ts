import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRolesRepository from '../repositories/IRolesRepository';

import Role from '../typeorm/entities/Role';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    id,
    name,
    description,
  }: IRequest): Promise<Role | undefined> {
    const role = await this.rolesRepository.findById(id);

    if (!role) {
      throw new AppError('Role not found.');
    }

    // TODO - Change this find to a findByName - The generic find, search by like and we need validate if the name is exactly the same
    let roles = await this.rolesRepository.find({
      name,
    });

    const roleWithName = roles.length ? roles[0] : null;

    if (roleWithName && String(roleWithName.id) !== String(id)) {
      throw new AppError('Role name already in use.');
    }

    // TODO - Change this find to a findByEmail - The generic find, search by like and we need validate if the description is exactly the same
    roles = await this.rolesRepository.find({
      description,
    });

    const roleWithAbbreviation = roles.length ? roles[0] : null;

    if (
      roleWithAbbreviation &&
      String(roleWithAbbreviation.id) !== String(id)
    ) {
      throw new AppError('Role description already in use.');
    }

    Object.assign(role, { name, description });

    await this.rolesRepository.save(role);

    return role;
  }
}

export default UpdateRoleService;
