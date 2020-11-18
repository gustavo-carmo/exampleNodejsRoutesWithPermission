import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../typeorm/entities/User';

interface IRequest {
  name?: string;
  email?: string;
}

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, email }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.find({ name, email });

    return users;
  }
}

export default ListUserService;
