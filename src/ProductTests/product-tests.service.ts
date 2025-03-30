import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTest } from './product-test.entity';
import { CreateProductTestDto } from './create-product-test.dto';
import { UpdateProductTestDto } from './update-product-test.dto';

@Injectable()
export class ProductTestsService {
  constructor(
    @InjectRepository(ProductTest)
    private readonly productTestRepository: Repository<ProductTest>,
  ) {}

  async create(data: CreateProductTestDto): Promise<ProductTest> {
    const productTest = this.productTestRepository.create(data);
    return this.productTestRepository.save(productTest);
  }

  async findAll(): Promise<ProductTest[]> {
    return this.productTestRepository.find();
  }

  async update(id: string, updateData: UpdateProductTestDto): Promise<ProductTest> {
    const productTest = await this.productTestRepository.preload({
      id,
      ...updateData,
    });

    if (!productTest) {
      throw new NotFoundException(`ProductTest with ID ${id} not found`);
    }

    return this.productTestRepository.save(productTest);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productTestRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ProductTest with ID ${id} not found`);
    }
  }
}


