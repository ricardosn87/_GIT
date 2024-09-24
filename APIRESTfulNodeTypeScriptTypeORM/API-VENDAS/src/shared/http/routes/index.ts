import productsRouter from '@modules/routes/products.routes';
import usersRouter from '@modules/routes/users.routes';
import sessionsRouter from '@modules/routes/sessions.routes';
import passwordRouter from '@modules/routes/password.routes';
import profileRouter from '@modules/routes/profile.routes';
import customersRouter from '@modules/routes/customers.routes';
import ordersRouter from '@modules/routes/orders.routes';

import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

/* routes.get('/', (request, response) => {
  return response.json({ messsage: 'hello dev!' });
}); */

export default routes;
