import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import IRolesRepository from '@modules/roles/repositories/IRolesRepository';

import Role from '@modules/roles/typeorm/entities/Role';
import IFindRoleDTO from '@modules/roles/dtos/IFindRoleDTO';
import { uuid } from 'uuidv4';

class FakeRolesRepository implements IRolesRepository {
  private roles: Role[] = [];

  public async create({ name, description }: ICreateRoleDTO): Promise<Role> {
    const role = new Role();

    Object.assign(role, { id: uuid(), name, description });

    this.roles.push(role);

    return role;
  }

  public async findById(id: string): Promise<Role | undefined> {
    return this.roles.find((role) => role.id === id);
  }

  public async save(role: Role): Promise<Role> {
    const roleIndex = this.roles.findIndex(
      (findRole) => findRole.id === role.id,
    );

    this.roles[roleIndex] = role;

    return role;
  }

  public async delete(role: Role): Promise<void> {
    const roleIndex = this.roles.findIndex(
      (findRole) => findRole.id === role.id,
    );

    this.roles.splice(roleIndex, 1);
  }

  public async find({ name, description }: IFindRoleDTO): Promise<Role[]> {
    return this.roles.filter(
      (role) =>
        (name && role.name === name) ||
        (description && role.description === description) ||
        (!name && !description && role),
    );
  }
}

export default FakeRolesRepository;
