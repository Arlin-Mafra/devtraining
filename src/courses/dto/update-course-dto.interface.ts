export interface UpdateCourseDto {
  id?: number;
  readonly name?: string;
  readonly description?: string;
  readonly tags?: string[];
}
