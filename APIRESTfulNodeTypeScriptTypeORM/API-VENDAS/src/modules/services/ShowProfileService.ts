import AppError from "@shared/errors/AppError";
import User from "@shared/typeorm/entities/User";
import UsersRepository from "@shared/typeorm/respositories/UserRepository";
import { getCustomRepository } from "typeorm";

interface IRequest {
  user_id: string;
}
class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }
    return user;
  }
}
export default ShowProfileService;
