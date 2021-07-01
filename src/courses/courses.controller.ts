import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course-dto.interface';
import { UpdateCourseDto } from './dto/update-course-dto.interface';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}
  @Get()
  list() {
    return this.courseService.list();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.courseService.show(id);
  }

  @Post()
  Create(@Body() createCourseDTO: CreateCourseDto) {
    return this.courseService.cretate(createCourseDTO);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDTO: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
