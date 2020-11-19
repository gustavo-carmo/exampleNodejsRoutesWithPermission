import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListRoleService from '@modules/roles/services/ListRoleService';
import ShowRoleService from '@modules/roles/services/ShowRoleService';
import CreateRoleService from '@modules/roles/services/CreateRoleService';
import UpdateRoleService from '@modules/roles/services/UpdateRoleService';
import DeleteRoleService from '@modules/roles/services/DeleteRoleService';

export default class RolesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.query;

    const listRoleService = container.resolve(ListRoleService);

    const roles = await listRoleService.execute({
      ...(name ? { name: String(name) } : {}),
      ...(description ? { description: String(description) } : {}),
    });

    return response.json(roles);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showRoleService = container.resolve(ShowRoleService);

    const role = await showRoleService.execute(id);

    return response.json(role);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createRoleService = container.resolve(CreateRoleService);

    const role = await createRoleService.execute({ name, description });

    return response.json(role);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, description } = request.body;

    const updateRoleService = container.resolve(UpdateRoleService);

    const role = await updateRoleService.execute({
      id,
      name,
      description,
    });

    return response.json(role);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRoleService = container.resolve(DeleteRoleService);

    await deleteRoleService.execute(id);

    return response.status(204).json();
  }
}
