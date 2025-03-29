import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './create-order.dto';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    return this.ordersService.deleteOrder(id);
  }
}
