import AppError from "@shared/errors/AppError";
import Customers from "@shared/typeorm/entities/Customer";
import CustomersRepository from "@shared/typeorm/respositories/CustomersRepository";
import { getCustomRepository } from "typeorm";

interface IRequest {
  id: string;
}

class ShowCustomerService {

  public async execute({ id }: IRequest): Promise<Customers> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const customer = await customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found.');
    }
    return customer;
  }
  
}
export default ShowCustomerService;
