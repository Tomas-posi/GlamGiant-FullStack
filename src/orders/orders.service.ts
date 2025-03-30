import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order, PaymentStatus } from './order.entity';
import { CreateOrderDto } from './create-order.dto';
import { UpdateOrderDto } from './update-order.dto';
import { MakeupProduct } from '../products/makeUp-product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(MakeupProduct)
    private productRepository: Repository<MakeupProduct>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { client_id, products, payment_status } = createOrderDto;

    const foundProducts = await this.productRepository.findBy({ id: In(products) });
    if (foundProducts.length !== products.length) {
      throw new BadRequestException('Some products were not found');
    }

    const totalAmount = foundProducts.reduce((sum, product) => sum + product.price, 0);

    const order = this.ordersRepository.create({ client_id, products, total_amount: totalAmount, payment_status });
    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.preload({ id, ...updateOrderDto });
    if (!order) throw new NotFoundException('Order not found');
    return this.ordersRepository.save(order);
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.ordersRepository.delete(id);
    if (!result.affected) throw new NotFoundException('Order not found');
    return { message: 'Order deleted successfully' };
  }
}
