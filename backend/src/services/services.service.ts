import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity'; // ✅ Import clave

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async create(serviceData: Partial<Service>): Promise<Service> {
    const service = this.servicesRepository.create(serviceData);
    return this.servicesRepository.save(service);
  }

  async findAll(): Promise<Service[]> {
    return this.servicesRepository.find();
  }

  async update(id: number, updateData: Partial<Service>): Promise<Service> {
    const service = await this.servicesRepository.findOne({ where: { id } });
    if (!service) {
      throw new Error(`Servicio con ID ${id} no encontrado`);
    }

    Object.assign(service, updateData);
    return this.servicesRepository.save(service);
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      await this.servicesRepository.delete(id);
      return { message: `Servicio con ID ${id} eliminado correctamente` };
    } catch (error) {
      throw new Error('No se puede eliminar el servicio porque tiene datos asociados.');
    }
  }
}
