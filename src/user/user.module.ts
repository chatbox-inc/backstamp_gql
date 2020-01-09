import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';

import { UserCommand} from './user.command';
import { BacklogModule } from '../backlog/backlog.module' ;
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserTokenEntity } from './usertoken.entity';
import { AuthResolver } from './auth.resolver';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserTokenEntity
    ]),
    BacklogModule
  ],
  // controllers: [UserController],
  providers: [UserCommand,UserService,UserResolver,AuthResolver,AuthGuard],
  // providers: [UserCommand,UserService, UserResolver, CommentService],
  exports: [UserService]
})
export class UserModule {}
