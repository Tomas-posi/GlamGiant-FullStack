import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTest } from './product-test.entity';
import { ProductTestsService } from './product-tests.service';
import { ProductTestsController } from './product-tests.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTest])],
  controllers: [ProductTestsController],
  providers: [ProductTestsService],
  exports: [ProductTestsService],
})
export class ProductTestsModule {}