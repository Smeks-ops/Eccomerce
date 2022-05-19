import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/users.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  create(payload: any) {
    return this.orderRepository.save(payload);
  }

  getAllOrdersForASeller(user: User) {
    return this.orderRepository.find({
      where: {
        seller: user,
      },
    });
  }
}
