import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductTest } from './product-test.entity';
import { CreateProductTestDto } from './create-product-test.dto';

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
}