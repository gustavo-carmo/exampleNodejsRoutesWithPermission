import { container } from 'tsyringe';
/*
IMPORT CONTAINER EXAMPLE

import IExamplesRepository from '@modules/examples/repositories/IExamplesRepository';
import ExamplesRepository from '@modules/examples/typeorm/repositories/ExamplesRepository';

container.registerSingleton<IExamplesRepository>(
  'ExamplesRepository',
  ExamplesRepository,
);
*/

import IProfilesRepository from '@modules/profiles/repositories/IProfilesRepository';
import ProfilesRepository from '@modules/profiles/typeorm/repositories/ProfilesRepository';

import IRolesRepository from '@modules/roles/repositories/IRolesRepository';
import RolesRepository from '@modules/roles/typeorm/repositories/RolesRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';

container.registerSingleton<IProfilesRepository>(
  'ProfilesRepository',
  ProfilesRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
