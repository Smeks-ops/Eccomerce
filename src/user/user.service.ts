import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
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
      userType: result.type,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findById(id: string): Promise<User> {
    return await User.findOne(id);
  }

  async findByUsername(username: string): Promise<User> {
    return await User.findOne({
      where: {
        username: username,
      },
    });
  }
}
