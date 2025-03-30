import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './create-order.dto';
import { UpdateOrderDto } from './update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { items } = createOrderDto;

    const order = this.ordersRepository.create();
    await this.ordersRepository.save(order);

    const orderItems = items.map(item =>
      this.orderItemsRepository.create({
        order,
        service: { id: item.serviceId },
        quantity: item.quantity,
        price: item.price,
      }),
    );

    await this.orderItemsRepository.save(orderItems);

    return this.getOrderById(order.id);
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['items', 'items.service'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['items', 'items.service'] });
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.ordersRepository.preload({
      id,
      ...updateOrderDto,
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return this.ordersRepository.save(order);
  }

  async deleteOrder(id: number): Promise<{ message: string }> {
    const result = await this.ordersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return { message: `Order with ID ${id} successfully deleted` };
  }
}
