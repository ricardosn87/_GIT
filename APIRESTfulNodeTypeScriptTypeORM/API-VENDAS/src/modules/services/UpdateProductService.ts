import RedisCache from '@shared/chache/RedisCache';
import AppError from '@shared/errors/AppError';
import Product from '@shared/typeorm/entities/Products';
import { ProductRepository } from '@shared/typeorm/respositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    const productExists = await productsRepository.findByName(name);

    if (productExists && name === product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
