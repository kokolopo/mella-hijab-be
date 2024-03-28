import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.authService.addUser(dto);
  }

  @Post('login')
  login(@Body() dto: any) {
    return this.authService.login(dto);
  }
}
