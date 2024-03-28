import { Injectable } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VariantsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVariantDto) {
    const newVariant = await this.prisma.variant.create({
      data: {
        name: dto.name,
        desc: dto.desc,
      },
    });

    return { result: newVariant };
  }

  async findAll() {
    const data = await this.prisma.variant.findMany();

    return { data };
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  update(id: number, updateVariantDto: UpdateVariantDto) {
    return `This action updates a #${id} variant`;
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
