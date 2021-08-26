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
      host: 'ec2-18-211-41-246.compute-1.amazonaws.com',
      port: 5432,
      username: 'duvpnydfbvjxzo',
      password:
        'e019a2807402c8afe4fe45a6e54235251b8f2b8e9f80004d2c5f6ce97be7a992',
      database: 'dc7lo71n0utaav',
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
