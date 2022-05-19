import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';
import { Repository } from 'typeorm';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { Catalog } from './entities/catalog.entity';
import { User } from '../user/entities/users.entity';
import { OrderService } from '../order/order.service';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Catalog)
    private catalogRepository: Repository<Catalog>,
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  async create(createCatalogDto: CreateCatalogDto, user: User) {
    const { productId } = createCatalogDto;

    const productDetail = await this.productService.findByIds(productId);

    const catalogPayload = {
      seller: user,
      products: productDetail,
    };
    try {
      const data = await this.catalogRepository.save(catalogPayload);
      return data;
    } catch (error) {
      throw new BadRequestException('You can only create a catalog once');
    }
  }

  findBySellerId(sellerId: string) {
    return this.catalogRepository.findOne({
      where: {
        seller: sellerId,
      },
    });
  }

  async selectProductFromCatalog(sellerId: string, ids: number[], buyer: User) {
    const result = await this.catalogRepository.findOne({
      where: {
        seller: sellerId,
      },
    });

    if (result === undefined) {
      throw new NotFoundException();
    }

    const { products, seller } = result;

    const finalProducts = products.filter((f) => {
      return ids.includes(f.id);
    });

    // save order
    const orderPayload = {
      createdBy: buyer,
      products: finalProducts,
      seller,
    };

    return this.orderService.create(orderPayload);
  }
}
