import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MakeupProduct } from './makeUp-product.entity';
import { CreateMakeupProductDto } from './create-makeUp-product.dto';
import { UpdateMakeupProductDto } from './update-makeUp-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(MakeupProduct)
    private readonly productRepository: Repository<MakeupProduct>,
  ) {}

  // Create a new product
  async create(createProductDto: CreateMakeupProductDto): Promise<MakeupProduct> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  // Get all products
  async findAll(): Promise<MakeupProduct[]> {
    return await this.productRepository.find();
  }

  // Get a product by ID
  async findOne(id: number): Promise<MakeupProduct> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  // Update a product
  async update(id: number, updateProductDto: UpdateMakeupProductDto): Promise<MakeupProduct> {
    await this.findOne(id); // Check if product exists
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  // Delete a product
  async remove(id: number): Promise<void> {
    await this.findOne(id); // Check if product exists
    await this.productRepository.delete(id);
  }
}


