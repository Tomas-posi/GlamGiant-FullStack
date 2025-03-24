import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service } from './service.entity'; // ✅ Importar la entidad

@Module({
  imports: [TypeOrmModule.forFeature([Service])], // ✅ Registrar entidad aquí
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
