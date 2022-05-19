import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Catalog } from '../../catalog/entities/catalog.entity';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';

export enum UserType {
  BUYER = 'buyer',
  SELLER = 'seller',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.BUYER,
  })
  type: UserType;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @OneToOne(() => Catalog, (catalog) => catalog.seller)
  myCatalog: Catalog;

  @OneToMany(() => Order, (order) => order.createdBy)
  myOrders: Order[];

  @OneToMany(() => Order, (order) => order.seller)
  buyers: Order[];

  @OneToMany(() => Product, (product) => product.seller)
  myProducts: Product[];
}
