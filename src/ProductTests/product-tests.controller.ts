import { Controller, Post, Get, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { ProductTestsService } from './product-tests.service';
import { CreateProductTestDto } from './create-product-test.dto';
import { UpdateProductTestDto } from './update-product-test.dto';

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductTestDto: UpdateProductTestDto) {
    const updatedProductTest = await this.productTestsService.update(id, updateProductTestDto);
    if (!updatedProductTest) {
      throw new NotFoundException(`Product Test with ID ${id} not found`);
    }
    return updatedProductTest;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.productTestsService.remove(id);
    return { message: `Product Test with ID ${id} successfully deleted` };
  }
}
