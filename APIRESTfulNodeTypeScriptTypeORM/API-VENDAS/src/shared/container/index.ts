import { ICustomersRepository } from '@modules/domain/repositories/ICustomersRepository';
import CustomersRepository from '@shared/typeorm/respositories/CustomersRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
