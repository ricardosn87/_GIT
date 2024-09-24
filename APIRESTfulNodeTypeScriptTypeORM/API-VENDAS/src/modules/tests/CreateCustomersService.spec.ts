import 'reflect-metadata';
import CreateCustomerService from '@modules/services/CreateCustomerService';
import FakeCustomersRepository from './fakes/FakeCustomerRespositpory';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomers: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomers = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomers.execute({
      name: 'Jorge Aluizio',
      email: 'teste@teste.com',
    });
    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomers.execute({
      name: 'Jorge Aluizio',
      email: 'teste@teste.com',
    });
    expect(
      createCustomers.execute({
        name: 'Jorge Aluizio',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
