import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entites/user.entity';
import { Rol } from './entites/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Rol]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
