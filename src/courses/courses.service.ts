import { Injectable } from '@nestjs/common';
import { Course } from './entity/Courso';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Curso NestJS',
      description: 'Curso NestJS',
      tags: ['nodeJS', 'NestJS'],
    },
  ];

  list() {
    return this.courses;
  }

  show(id: string) {
    return this.courses.find((course: Course) => course.id === Number(id));
  }

  cretate(createCourse: any) {
    this.courses.push(createCourse);
    return createCourse;
  }

  update(id: string, updateCourse: any) {
    const courseIndex = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );

    this.courses[courseIndex] = updateCourse;
    return updateCourse;
  }

  delete(id: string) {
    const courseIndex = this.courses.findIndex(
      (course: Course) => course.id === Number(id),
    );

    if (courseIndex >= 0) {
      this.courses.splice(courseIndex, 1);
    }
  }
}
