import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateMakeupProductDto } from './create-makeUp-product.dto';
import { UpdateMakeupProductDto } from './update-makeUp-product.dto';
import { MakeupProduct } from './makeUp-product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateMakeupProductDto): Promise<MakeupProduct> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<MakeupProduct[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<MakeupProduct> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateMakeupProductDto,
  ): Promise<MakeupProduct> {
    const updatedProduct = await this.productsService.update(id, updateProductDto);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.productsService.remove(id);
    return { message: `Product with ID ${id} successfully deleted` };
  }
}



