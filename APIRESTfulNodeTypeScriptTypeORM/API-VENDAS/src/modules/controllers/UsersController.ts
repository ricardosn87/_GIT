import CreateUserService from '@modules/services/CreateUserService';
import ListUserService from '@modules/services/ListUserService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    console.log(request.user.id);

    const users = await listUser.execute();

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }
}
