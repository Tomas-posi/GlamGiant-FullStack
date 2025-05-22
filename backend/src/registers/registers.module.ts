import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistersService } from './registers.service';
import { RegistersController } from './registers.controller';
import { Register } from './register.entity';
import { User } from '../users/user.entity';
import { Service } from '../services/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Register, User, Service])], // ✅ Aquí debe estar Register
  controllers: [RegistersController],
  providers: [RegistersService],
})
export class RegistersModule {}
