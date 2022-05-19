import { User } from '../../user/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  isDeleted?: boolean;

  @ManyToOne(() => User, (user) => user.myOrders, { eager: true })
  @JoinColumn({ name: 'buyer_id' })
  createdBy: User;

  @ManyToOne(() => User, (user) => user.buyers, { eager: true })
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @Column({
    type: 'jsonb',
    default: () => "'[]'",
    nullable: false,
  })
  products: Product[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
