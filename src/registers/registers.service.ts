import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Register } from './register.entity';

@Injectable()
export class RegistersService {
  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
  ) {}

  async create(registerData: Partial<Register>): Promise<Register> {
    const register = this.registerRepository.create(registerData);
    return this.registerRepository.save(register);
  }

  async findAll(): Promise<Register[]> {
    return this.registerRepository.find({ relations: ['user', 'service'] });
  }

  async update(id: number, updateData: Partial<Register>): Promise<Register> {
    const register = await this.registerRepository.findOne({ where: { id } });
    if (!register) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }

    Object.assign(register, updateData);
    return this.registerRepository.save(register);
  }

  async delete(id: number): Promise<void> {
    const result = await this.registerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        'No se pudo eliminar el registro. Verifique si existe o si tiene relaciones con otros datos.',
      );
    }
  }
}

