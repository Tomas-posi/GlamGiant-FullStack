import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  create(serviceData: Partial<Service>): Promise<Service> {
    const service = this.serviceRepository.create(serviceData);
    return this.serviceRepository.save(service);
  }

  findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }
}
