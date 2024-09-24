import AppError from '@shared/errors/AppError';
import UsersRepository from '@shared/typeorm/respositories/UserRepository';
import UserTokensRepository from '@shared/typeorm/respositories/UserTokenRepository';
import { getCustomRepository } from 'typeorm';
import EntherealMail from '@config/mail/EtherealMail';
import path from 'path';
import { link } from 'fs';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await userTokensRepository.generate(user.id);

    const forgotPasswordTempalte = path.resolve(
      __dirname,
      '..',
      '..',
      'shared',
      'views',
      'forgot_password.hbs',
    );

    await EntherealMail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTempalte,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
