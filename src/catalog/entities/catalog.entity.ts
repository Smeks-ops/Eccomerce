import { User } from '../../user/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Catalog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  isDeleted?: boolean;

  @OneToOne(() => User, (user) => user.myCatalog, { eager: true })
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
