import UpdateUserAvatarService from '@modules/services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';


export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    console.log('request.file?.filename:' + request.file?.filename)

    const user = updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string
    });

    return response.json(instanceToInstance(user));
  }
}
