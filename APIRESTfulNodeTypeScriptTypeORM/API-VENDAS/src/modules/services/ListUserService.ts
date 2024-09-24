import User from "@shared/typeorm/entities/User";
import UsersRepository from "@shared/typeorm/respositories/UserRepository";
import { getCustomRepository } from "typeorm";

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return users;
  }
}

export default ListUserService;
