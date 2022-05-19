import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../auth/auth.decorator';
import { User } from '../user/entities/users.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @AuthUser() user: User,
  ) {
    await this.handleRestriction(user);
    return this.productService.create(createProductDto);
  }

  async handleRestriction(user: User) {
    if (user.type === 'buyer')
      throw new BadRequestException(
        'Sorry, only a seller can perform this action',
      );
  }
}
