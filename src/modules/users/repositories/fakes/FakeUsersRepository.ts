import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/typeorm/entities/User';
import IFindUserDTO from '@modules/users/dtos/IFindUserDTO';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({ name, email }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email });

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.users[userIndex] = user;

    return user;
  }

  public async delete(user: User): Promise<void> {
    const userIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.users.splice(userIndex, 1);
  }

  public async find({ name, email }: IFindUserDTO): Promise<User[]> {
    return this.users.filter(
      (user) =>
        (name && user.name === name) ||
        (email && user.email === email) ||
        (!name && !email && user),
    );
  }
}

export default FakeUsersRepository;
