import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  async findOne(id: number) {
    const result = await this.productRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (result === undefined) {
      throw new NotFoundException('Product not found');
    }

    return result;
  }

  findByIds(ids: number[]) {
    return this.productRepository.findByIds(ids);
  }
}
