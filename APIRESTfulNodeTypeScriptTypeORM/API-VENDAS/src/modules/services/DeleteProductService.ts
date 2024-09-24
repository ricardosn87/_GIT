import RedisCache from "@shared/chache/RedisCache";
import AppError from "@shared/errors/AppError";
import { ProductRepository } from "@shared/typeorm/respositories/ProductsRepository";
import { getCustomRepository } from "typeorm";

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
