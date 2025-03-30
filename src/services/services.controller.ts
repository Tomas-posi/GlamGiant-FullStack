import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity'; // ✅ Este import es importante

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() serviceData: Partial<Service>): Promise<Service> {
    return this.servicesService.create(serviceData);
  }

  @Get()
  async findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateData: Partial<Service>): Promise<Service> {
    return this.servicesService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return this.servicesService.delete(id);
  }
}
