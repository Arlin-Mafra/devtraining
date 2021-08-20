import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course-dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  list(): Promise<Course[]> {
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async show(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne(id, {
      relations: ['tags'],
    });
    if (!course) {
      throw new NotFoundException(`Curso de ID ${id} não encontrado`);
    } else {
      return course;
    }
  }

  async cretate(createCourseDto: CreateCourseDto) {
    try {
      const tags = await Promise.all(
        createCourseDto.tags.map((name) => this.preloadTagByName(name)),
      );

      const courseCreate = this.courseRepository.create({
        ...createCourseDto,
        tags,
      });
      await this.courseRepository.save(courseCreate);
      return courseCreate;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, course: UpdateCourseDto) {
    const tags =
      course.tags &&
      (await Promise.all(
        course.tags.map((name) => this.preloadTagByName(name)),
      ));

    const courseUpdate = await this.courseRepository.preload({
      id: id,
      ...course,
      tags,
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

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ name });

    if (tag) {
      return tag;
    }
    return this.tagRepository.create({ name });
  }
}
