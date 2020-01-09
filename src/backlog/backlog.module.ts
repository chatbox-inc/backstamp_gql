import { Module } from '@nestjs/common';
import {BacklogService} from './backlog.service';

@Module({
  imports: [
  ],
  // controllers: [UserController],
  // providers: [SpaceCommand],
  providers: [BacklogService],
  exports: [
    BacklogService
  ]
  // providers: [UserCommand,UserService, UserResolver, CommentService],
})
export class BacklogModule {}
