import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { Response } from 'express';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.authService.addUser(dto);
  }

  @Post('login')
  async login(
    @Body() dto: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const res = await this.authService.login(dto);
    response.cookie('token', res.token, {
      httpOnly: true,
      domain: 'http://localhost:3000',
    });

    return res;
  }
}
