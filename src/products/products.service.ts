import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MakeupProduct } from './makeUp-product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(MakeupProduct)
    private readonly productRepository: Repository<MakeupProduct>,
  ) {}

  // Create a new product
  async create(productData: Partial<MakeupProduct>): Promise<MakeupProduct> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  // Get all products
  async findAll(): Promise<MakeupProduct[]> {
    return this.productRepository.find();
  }

  // Get a product by ID
  async findOne(id: number): Promise<MakeupProduct | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  // Update a product
  async update(id: number, productData: Partial<MakeupProduct>): Promise<MakeupProduct | null> {
    await this.productRepository.update(id, productData);
    return this.findOne(id);
  }

  // Delete a product
  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
