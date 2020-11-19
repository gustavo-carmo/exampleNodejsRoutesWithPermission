import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IRolesRepository from '@modules/roles/repositories/IRolesRepository';

import User from '../typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    roles
  }: IRequest): Promise<User | undefined> {
    // TODO - Change this find to a findByName - The generic find, search by like and we need validate if the name is exactly the same
    let users = await this.usersRepository.find({ name });
    let checkUserExists = users.length ? users[0] : null;

    if (checkUserExists) {
      throw new AppError('User already created.');
    }

    // TODO - Change this find to a findByEmail - The generic find, search by like and we need validate if the email is exactly the same
    users = await this.usersRepository.find({ email });
    checkUserExists = users.length ? users[0] : null;

    if (checkUserExists) {
      throw new AppError('User already created.');
    }

    const existsRoles = await this.rolesRepository.findByIds(roles);

    const user = await this.usersRepository.create({
      name,
      email,
      password,
      roles: existsRoles
    });

    return user;
  }
}

export default CreateUserService;
