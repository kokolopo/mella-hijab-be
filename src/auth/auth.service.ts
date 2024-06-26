import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateUserDto } from './dto/createUser.dto';
import { UserLoginDto } from './dto/userLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(dto: UserLoginDto) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { username: dto.username },
        include: { role: true },
      });

      if (!user) throw new ForbiddenException('User Not Found!');

      if (await argon.verify(user.password, dto.password)) {
        const token = await this.signToken(
          user.id,
          user.username,
          user.role.role_name,
        );

        return { user, token };
      }
      throw new BadRequestException('wrong password!');
    } catch (error) {
      throw error;
    }
  }

  async addUser(dto: CreateUserDto) {
    try {
      const password_hash = await argon.hash(dto.password);

      const newUser = await this.prisma.users.create({
        data: {
          role_id: dto.role,
          username: dto.username,
          bod: new Date(dto.bod),
          pob: dto.pob,
          domicile: dto.domicile,
          password: password_hash,
        },
      });

      return { result: newUser };
    } catch (error) {
      throw error;
    }
  }

  signToken(id: number, name: string, role: string): Promise<string> {
    const payload = { sub: id, name, role };
    const secret = this.config.get('JWT_SECRET');

    return this.jwt.signAsync(payload, { secret });
  }
}
