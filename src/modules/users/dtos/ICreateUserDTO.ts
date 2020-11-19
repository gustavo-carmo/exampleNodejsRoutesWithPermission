import Role from "@modules/roles/typeorm/entities/Role";

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  roles: Role[];
}
