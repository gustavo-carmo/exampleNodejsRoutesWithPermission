import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProfileService from '@modules/profiles/services/ListProfileService';
import ShowProfileService from '@modules/profiles/services/ShowProfileService';
import CreateProfileService from '@modules/profiles/services/CreateProfileService';
import UpdateProfileService from '@modules/profiles/services/UpdateProfileService';
import DeleteProfileService from '@modules/profiles/services/DeleteProfileService';

export default class ProfilesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.query;

    const listProfileService = container.resolve(ListProfileService);

    const profiles = await listProfileService.execute({
      ...(name ? { name: String(name) } : {}),
      ...(description ? { description: String(description) } : {}),
    });

    return response.json(profiles);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProfileService = container.resolve(ShowProfileService);

    const profile = await showProfileService.execute(id);

    return response.json(profile);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createProfileService = container.resolve(CreateProfileService);

    const profile = await createProfileService.execute({ name, description });

    return response.json(profile);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, description } = request.body;

    const updateProfileService = container.resolve(UpdateProfileService);

    const profile = await updateProfileService.execute({
      id,
      name,
      description,
    });

    return response.json(profile);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProfileService = container.resolve(DeleteProfileService);

    await deleteProfileService.execute(id);

    return response.status(204).json();
  }
}
