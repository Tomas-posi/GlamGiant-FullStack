import { Controller, Post, Get, Body } from '@nestjs/common';
import { RegistersService } from './registers.service';
import { Register } from './register.entity';

@Controller('registers')
export class RegistersController {
  constructor(private readonly registersService: RegistersService) {}

  @Post()
  create(@Body() data: { userId: number; serviceId: number; date: Date; status?: string }): Promise<Register> {
    return this.registersService.create(data);
  }

  @Get()
  findAll(): Promise<Register[]> {
    return this.registersService.findAll();
  }
}
