import {
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AuthUser } from '../auth/auth.decorator';
import { User } from '../user/entities/users.entity';

@ApiTags('catalog')
@ApiBearerAuth()
@Controller('catalog')
@UseGuards(JwtAuthGuard)
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post('seller/create-catalog')
  async create(
    @Body() createCatalogDto: CreateCatalogDto,
    @AuthUser() user: User,
  ) {
    await this.handleRestriction(user);
    return this.catalogService.create(createCatalogDto, user);
  }

  async handleRestriction(user: User) {
    if (user.type === 'buyer')
      throw new BadRequestException('Only a seller can perform this action');
  }
}
