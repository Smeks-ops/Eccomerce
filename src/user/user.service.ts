import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CatalogService } from '../catalog/catalog.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserType } from './entities/users.entity';
import { CreateCatalogDto } from '../catalog/dto/create-catalog.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private catalogService: CatalogService,
    private orderService: OrderService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    // check if the email already exists
    const isExist = await this.findByUsername(createUserDto.username);
    if (isExist) throw new BadRequestException('Email already exists');

    const createUserPayload = new User();
    createUserPayload.username = createUserDto.username;
    createUserPayload.password = createUserDto.password;
    createUserPayload.type = createUserDto.type;

    const result = await this.userRepository.save(createUserPayload);

    // use the id, username and user type of the registered user to create a token
    const payload = {
      id: result.id,
      username: result.username,
      type: result.type,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '24h',
    });

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async findById(id: string): Promise<User> {
    return await User.findOne(id);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async getAllSellers(): Promise<User[]> {
    return this.userRepository.find({
      where: {
        type: UserType.SELLER,
      },
    });
  }

  async getSellerById(sellerId: string) {
    return this.catalogService.findBySellerId(sellerId);
  }

  async selectProductFromCatalog(
    sellerId: string,
    createCatalogDto: CreateCatalogDto,
    user: User,
  ) {
    const { productId } = createCatalogDto;
    return this.catalogService.selectProductFromCatalog(
      sellerId,
      productId,
      user,
    );
  }

  async getAllOrdersForASeller(user: User) {
    return this.orderService.getAllOrdersForASeller(user);
  }
}
