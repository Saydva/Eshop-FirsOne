import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser } from 'src/auth/schema/authUser.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(AuthUser.name) private readonly userModel: Model<AuthUser>,
  ) {}

  async getAllUsers(): Promise<AuthUser[]> {
    return await this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<AuthUser> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(
    userId: string,
    updateData: Partial<AuthUser>,
  ): Promise<AuthUser> {
    const user = await this.userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async changeUserRole(userId: string, newRole: string): Promise<AuthUser> {
    const user = await this.userModel.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteUser(userId: string): Promise<AuthUser> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
