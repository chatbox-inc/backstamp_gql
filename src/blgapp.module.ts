// import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';

// import { HttpErrorFilter } from './shared/http-error.filter';
// import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';
import { SpaceModule } from './space/space.module';
import { BacklogModule } from './backlog/backlog.module';

const modules = [
  UserModule,
  SpaceModule,
  BacklogModule
]

@Module({
  imports: modules,
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpErrorFilter,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
  ],
  exports: modules,
})
export class BlgappModule {}
