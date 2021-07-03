import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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

  async update(course: UpdateCourseDto): Promise<UpdateResult> {
    return await this.courseRepository.update(course.id, course);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.courseRepository.delete(id);
  }
}
