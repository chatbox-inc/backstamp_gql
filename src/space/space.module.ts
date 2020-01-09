import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {SpaceEntity} from './space.entity';
import {ProjectEntity} from './project.entity';
import {IssuesEntity} from './issues.entity';

import { SpaceCommand } from './space.command';
import { SpaceService} from './space.service';
import { BacklogModule } from '../backlog/backlog.module';
import { IssuesResolver } from './issues.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SpaceEntity,
      ProjectEntity,
      IssuesEntity
    ]),
    UserModule,
    BacklogModule
  ],
  // controllers: [UserController],
  providers: [
    SpaceCommand,
    SpaceService,
    IssuesResolver
  ],
})
export class SpaceModule {}
