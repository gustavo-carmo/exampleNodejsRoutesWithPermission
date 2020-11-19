import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRolesRepository from '../repositories/IRolesRepository';

import Role from '../typeorm/entities/Role';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    name,
    description,
  }: IRequest): Promise<Role | undefined> {
    // TODO - Change this find to a findByName - The generic find, search by like and we need validate if the name is exactly the same
    let roles = await this.rolesRepository.find({ name });
    let checkRoleExists = roles.length ? roles[0] : null;

    if (checkRoleExists) {
      throw new AppError('Role already created.');
    }

    // TODO - Change this find to a findByEmail - The generic find, search by like and we need validate if the description is exactly the same
    roles = await this.rolesRepository.find({ description });
    checkRoleExists = roles.length ? roles[0] : null;

    if (checkRoleExists) {
      throw new AppError('Role already created.');
    }

    const role = await this.rolesRepository.create({
      name,
      description,
    });

    return role;
  }
}

export default CreateRoleService;
