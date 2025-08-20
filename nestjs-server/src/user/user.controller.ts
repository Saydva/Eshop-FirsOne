import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from './guardRole/roles.decorator';
import { RolesGuard } from './guardRole/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserData: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserData);
  }

  @Patch(':id/role')
  async changeUserRole(@Param('id') id: string, @Body('role') newRole: string) {
    return await this.userService.changeUserRole(id, newRole);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
