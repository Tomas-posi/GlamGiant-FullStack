import { Controller, Post, Get, Body } from '@nestjs/common';
import { ProductTestsService } from './product-tests.service';
import { CreateProductTestDto } from './create-product-test.dto';

@Controller('product-tests')
export class ProductTestsController {
  constructor(private readonly productTestsService: ProductTestsService) {}

  @Post()
  create(@Body() createProductTestDto: CreateProductTestDto) {
    return this.productTestsService.create(createProductTestDto);
  }

  @Get()
  findAll() {
    return this.productTestsService.findAll();
  }
}
