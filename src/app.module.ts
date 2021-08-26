import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    CoursesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_NAME,
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity.js'],
      autoLoadEntities: false,
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
