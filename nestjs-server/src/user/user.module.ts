import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthSchema } from 'src/auth/schema/authUser.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthUser.name, schema: AuthSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
