import { ICreateCustomer } from '@modules/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/domain/models/ICustormer';
import { ICustomersRepository } from '@modules/domain/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';
import Customers from '@shared/typeorm/entities/Customer';
import CustomersRepository from '@shared/typeorm/respositories/CustomersRepository';
import { inject, injectable } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

@injectable()
class CreateCustomerService {
  constructor(

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email address already used.');
    }
    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}
export default CreateCustomerService;
