import { ICreateCustomer } from './../../../modules/domain/models/ICreateCustomer';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Customers from '../entities/Customer';
import { ICustomer } from '@modules/domain/models/ICustormer';
import { ICustomersRepository } from '@modules/domain/repositories/ICustomersRepository';

@EntityRepository(Customers)
class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customers>;

  constructor() {
    this.ormRepository = getRepository(Customers);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customers): Promise<Customers> {
    await this.ormRepository.save(customer);
    return customer;
  }

  public async findByName(name: string): Promise<Customers | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return customer;
  }

  public async findById(id: string): Promise<Customers | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return customer;
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return customer;
  }
}
export default CustomersRepository;
