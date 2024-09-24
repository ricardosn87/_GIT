import RedisCache from '@shared/chache/RedisCache';
import Product from '@shared/typeorm/entities/Products';
import { ProductRepository } from '@shared/typeorm/respositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
