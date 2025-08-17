import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser } from './schema/authUser.schema';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name) private userModel: Model<AuthUser>,
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
      role: registerDto.role,
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
    const payload = {
      email: user.email,
      sub: user._id,
      name: user.name,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;

    await user.save();

    return {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
        role: user.role,
        accessToken,
        refreshToken,
      },
    };
  }

  async refresh(refreshToken: string) {
    try {
      // 1. Over platnosť refresh tokenu a získaj payload
      const payload = await this.jwtService.verifyAsync(refreshToken);
      // 2. Nájsť používateľa podľa ID a refreshTokenu v DB
      const user = await this.userModel.findOne({
        _id: payload.sub,
        refreshToken,
      });
      if (!user) {
        throw new ConflictException('Invalid refresh token');
      }
      // 3. Vygeneruj nové tokeny
      const newAccessToken = this.jwtService.sign(
        { email: user.email, sub: user._id, name: user.name },
        { expiresIn: '15m' },
      );
      const newRefreshToken = this.jwtService.sign(
        { email: user.email, sub: user._id, name: user.name },
        { expiresIn: '1d' },
      );
      user.accessToken = newAccessToken;
      user.refreshToken = newRefreshToken;
      await user.save();
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new ConflictException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.accessToken = undefined;
    user.refreshToken = undefined;
    await user.save();

    return { message: 'Logged out successfully' };
  }

  async getUserById(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = user.toObject ? user.toObject() : user;
    return result;
  }

  async updateUser(userId: string, updateData: Partial<AuthUser>) {
    const user = await this.userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = user.toObject ? user.toObject() : user;
    return result;
  }
}
