import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const exists = await this.userModel.findOne({ email: registerDto.email });
    if (exists) {
      throw new ConflictException('User already exists');
    }

    const hash = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userModel.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hash,
    });
    const userObj = user.toObject ? user.toObject() : user;
    const { password, ...result } = userObj;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) {
      throw new ConflictException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new ConflictException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user._id, name: user.name };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });
    return {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const accessToken = this.jwtService.sign(
        { email: payload.email, sub: payload.sub, name: payload.name },
        { expiresIn: '15m' },
      );
      return { accessToken };
    } catch (error) {
      throw new ConflictException('Invalid refresh token');
    }
  }
}
