import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course-dto.interface';
import { UpdateCourseDto } from './dto/update-course-dto.interface';
import { Course } from './entity/Course';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async list(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  async show(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne(id);
    console.log(course);
    if (!course) {
      throw new HttpException(
        `Curso de ID ${id} não encontrado`,

        HttpStatus.NOT_FOUND,
      );
    } else {
      return course;
    }
  }

  async cretate(course: CreateCourseDto) {
    await this.courseRepository.save(course);
    return course;
  }

  async update(id: string, course: UpdateCourseDto) {
    const courseUpdate = await this.courseRepository.preload({
      id: course.id,
      ...course,
    });

    if (!courseUpdate) {
      throw new NotFoundException(`Curso de ID ${id} não encontrado`);
    }
    return this.courseRepository.save(courseUpdate);
  }

  async delete(id: string) {
    const course = await this.courseRepository.findOne(id);

    if (!course) {
      throw new NotFoundException(`Curso de ID ${id} não encontrado`);
    }
    return this.courseRepository.remove(course);
  }
}
