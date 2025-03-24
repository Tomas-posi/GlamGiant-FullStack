import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from './register.entity';
import { User } from '../users/user.entity';
import { Service } from '../services/service.entity';

@Injectable()
export class RegistersService {
  constructor(
    @InjectRepository(Register)
    private registerRepo: Repository<Register>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,
  ) {}

  async create(data: { userId: number; serviceId: number; date: Date; status?: string }) {
    const user = await this.userRepo.findOne({ where: { id: data.userId } });
    const service = await this.serviceRepo.findOne({ where: { id: data.serviceId } });

    if (!user) {
        throw new Error(`Usuario con ID ${data.userId} no encontrado`);
      }
      
      if (!service) {
        throw new Error(`Servicio con ID ${data.serviceId} no encontrado`);
      }
      

    const register = this.registerRepo.create({
      user,
      service,
      date: data.date,
      status: data.status || 'pendiente',
    });

    return this.registerRepo.save(register);
  }

  findAll() {
    return this.registerRepo.find({
      relations: ['user', 'service'],
    });
  }
}
