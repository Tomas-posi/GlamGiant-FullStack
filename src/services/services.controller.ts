import { Controller, Post, Get, Body } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() serviceData: Partial<Service>): Promise<Service> {
    return this.servicesService.create(serviceData);
  }

  @Get()
  findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }
}
