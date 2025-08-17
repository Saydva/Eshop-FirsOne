import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Request,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('login')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    return await this.authService.login({ email, password, role: 'user' });
  }

  @Post('refresh')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async refresh(@Body('refreshToken') refreshToken: string) {
    return await this.authService.refresh(refreshToken);
  }

  @Post('logout/:userId')
  @HttpCode(200)
  async logout(@Param('userId') userId: string) {
    return await this.authService.logout(userId);
  }

  // Endpoint to get user

  @UseGuards(JwtAuthGuard)
  @Get('user/me')
  async getMe(@Request() req) {
    return await this.authService.getUserById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/update')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async updateUser(@Request() req, @Body() updateDto: any) {
    return await this.authService.updateUser(req.user.userId, updateDto);
  }
}
