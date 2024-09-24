import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import User from '@shared/typeorm/entities/User';
import UsersRepository from '@shared/typeorm/respositories/UserRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    try {
      const usersRepository = getCustomRepository(UsersRepository);
      const user = await usersRepository.findByEmail(email);

      if (!user) {
        throw new AppError('Incorrect email/password combination.', 401);
      }

      const passwordConfirmed = await compare(password, user.password);

      if (!passwordConfirmed) {
        throw new AppError('Incorrect email/password combination.', 401);
      }

      const token = sign({}, auth.jwt.secret, {
        subject: user.id,
        expiresIn: auth.jwt.expiresIn,
      });

      return { user, token };
    } catch (error) {
      console.log(error);
      throw new AppError('An error occurred while creating the session.', 500);
    }
  }
}

export default CreateSessionsService;
