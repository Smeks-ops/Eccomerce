import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateCatalogDto } from '../catalog/dto/create-catalog.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthUser } from '../auth/auth.decorator';
import { User } from './entities/users.entity';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Get a list of all sellers',
  })
  @Get('buyer/list-of-sellers')
  getAllSellers() {
    return this.usersService.getAllSellers();
  }

  @ApiOkResponse({
    description: 'Get seller by id',
  })
  @Get('buyer/seller-catalog/:sellerId')
  getSellerById(@Param('sellerId') sellerId: string) {
    return this.usersService.getSellerById(sellerId);
  }

  @ApiOkResponse({
    description: 'Create order by a buyer',
  })
  @Post('buyer/create-order/:sellerId')
  selectProductFromCatalog(
    @Param('sellerId') sellerId: string,
    @Body() createCatalogDto: CreateCatalogDto,
    @AuthUser() user: User,
  ) {
    return this.usersService.selectProductFromCatalog(
      sellerId,
      createCatalogDto,
      user,
    );
  }

  @ApiOkResponse({
    description: 'Get all orders for a seller',
  })
  @Get('seller/orders')
  getAllOrdersForASeller(@AuthUser() user: User) {
    return this.usersService.getAllOrdersForASeller(user);
  }
}
