import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from '@modules/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/domain/repositories/ICustomersRepository';
import Customers  from '@shared/typeorm/entities/Customer';

class FakeCustomersRepository implements ICustomersRepository {

  private customers: Customers[] = [];
  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = new Customers();
    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;
    this.customers.push(customer);
    return customer;
  }
  public async save(customer: Customers): Promise<Customers> {
    Object.assign(this.customers, customer);
    return customer;
  }
  public async remove(customer: Customers): Promise<void> {}

  public async findAll(): Promise<Customers[] | undefined> {
    return undefined;
  }

  public async findByName(name: string): Promise<Customers | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customers | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
  
}
export default FakeCustomersRepository;
