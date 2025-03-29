import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './create-order.dto';

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
  
    // Create the order
    const order = this.ordersRepository.create();
    await this.ordersRepository.save(order);
  
    // Create order items
    const orderItems = items.map(item => 
      this.orderItemsRepository.create({ 
        order, 
        service: { id: item.serviceId }, 
        quantity: item.quantity, 
        price: item.price 
      })
    );

    await this.orderItemsRepository.save(orderItems);

    // Ensure the order is found and not null
    const savedOrder = await this.ordersRepository.findOne({ where: { id: order.id }, relations: ['items', 'items.service'] });
    
    if (!savedOrder) {
      throw new NotFoundException(`Order with ID ${order.id} was not found after creation`);
    }

    return savedOrder;
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id }, relations: ['items', 'items.service'] });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['items', 'items.service'] });
  }

  async deleteOrder(id: number): Promise<void> {
    const result = await this.ordersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
