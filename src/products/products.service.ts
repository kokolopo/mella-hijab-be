import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    const newProduct = await this.prisma.product.create({
      data: {
        product_name: dto.product_name,
        sku: dto.sku,
        category_id: dto.category_id,
        variant_id: dto.variant_id,
        price: dto.price,
        desc: dto.desc,
      },
    });

    return { result: newProduct };
  }

  async findAll() {
    const data = await this.prisma.product.findMany();

    return { data };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
