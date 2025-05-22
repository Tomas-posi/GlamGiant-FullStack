import { 
  Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException 
} from '@nestjs/common';
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
  async findOne(@Param('id') id: string): Promise<MakeupProduct> {
    this.validateUUID(id);
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateMakeupProductDto,
  ): Promise<MakeupProduct> {
    this.validateUUID(id);
    const updatedProduct = await this.productsService.update(id, updateProductDto);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    this.validateUUID(id);
    await this.productsService.remove(id);
    return { message: `Product with ID ${id} successfully deleted` };
  }

  // ✅ Helper function to validate UUID format
  private validateUUID(id: string) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException(`Invalid UUID format: ${id}`);
    }
  }
}

