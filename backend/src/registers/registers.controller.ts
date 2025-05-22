import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RegistersService } from './registers.service';
import { Register } from './register.entity';

@Controller('registers')
export class RegistersController {
  constructor(private readonly registersService: RegistersService) {}

  @Post()
  async create(@Body() registerData: Partial<Register>): Promise<Register> {
    return this.registersService.create(registerData);
  }

  @Get()
  async findAll(): Promise<Register[]> {
    return this.registersService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<Register>,
  ): Promise<Register> {
    return this.registersService.update(id, updateData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.registersService.delete(id);
  }
}

