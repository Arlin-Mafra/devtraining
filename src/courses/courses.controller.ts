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

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}
  @Get()
  list() {
    return this.courseService.list();
  }

  @Get(':id')
  show(@Param(':id') id: string) {
    return this.courseService.show(id);
  }

  @Post()
  Create(@Body() body) {
    return this.courseService.cretate(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.courseService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
