import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entity/Course';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), CoursesModule],
  exports: [TypeOrmModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
