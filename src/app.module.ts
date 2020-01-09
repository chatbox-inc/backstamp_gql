import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlgappModule} from './blgapp.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [
    CommandModule,
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      debug: true,
      typePaths: ['./src/*/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
    }),
    BlgappModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
