import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../typeorm/entities/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    // TODO - Change this find to a findByName - The generic find, search by like and we need validate if the name is exactly the same
    let users = await this.usersRepository.find({
      name,
    });

    const userWithName = users.length ? users[0] : null;

    if (userWithName && String(userWithName.id) !== String(id)) {
      throw new AppError('User name already in use.');
    }

    // TODO - Change this find to a findByEmail - The generic find, search by like and we need validate if the email is exactly the same
    users = await this.usersRepository.find({
      email,
    });

    const userWithAbbreviation = users.length ? users[0] : null;

    if (
      userWithAbbreviation &&
      String(userWithAbbreviation.id) !== String(id)
    ) {
      throw new AppError('User email already in use.');
    }

    Object.assign(user, { name, email });

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
