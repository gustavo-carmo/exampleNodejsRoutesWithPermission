import { getRepository, Like, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/typeorm/entities/User';
import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        _id: id,
      },
    });

    return user;
  }

  public async find({ name, email }: IFindUserDTO): Promise<User[]> {
    const queryParams = {};

    if (name) {
      Object.assign(queryParams, { name: Like(`%${name}%`) });
    }

    if (email) {
      Object.assign(queryParams, { email: Like(`%${email}%`) });
    }

    const users = await this.ormRepository.find({
      where: queryParams,
    });

    return users;
  }

  public async create({ name, email }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }
}

export default UsersRepository;
