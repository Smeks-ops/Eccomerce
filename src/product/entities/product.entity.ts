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

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'int', width: 10, nullable: true })
  price: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  isDeleted?: boolean;

  @ManyToOne(() => User, (user) => user.myProducts, { eager: true })
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
