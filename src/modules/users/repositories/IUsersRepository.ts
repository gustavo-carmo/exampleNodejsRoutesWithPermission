import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindUserDTO from '../dtos/IFindUserDTO';
import User from '../typeorm/entities/User';

export default interface IUsersRepository {
  create(date: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  find(date: IFindUserDTO): Promise<User[]>;
  save(user: User): Promise<User>;
  delete(user: User): Promise<void>;
}
