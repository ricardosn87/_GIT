import AppError from '@shared/errors/AppError';
import Customers from '@shared/typeorm/entities/Customer';
import User from '@shared/typeorm/entities/User';
import CustomersRepository from '@shared/typeorm/respositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  name: string;
  email: string;
}
class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customers> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found.');
    }
    const customerExists = await customersRepository.findByEmail(email);
    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }
    customer.name = name;
    customer.email = email;
    await customersRepository.save(customer);
    return customer;
  }
}
export default UpdateCustomerService;
