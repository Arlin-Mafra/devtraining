import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCourseTagTable1629467545898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses_tags',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'coursesId',
            type: 'varchar',
          },
          {
            name: 'tagsId',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'courses_tags_courses',
            referencedTableName: 'courses',
            referencedColumnNames: ['id'],
            columnNames: ['coursesId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'courses_tags_tags',
            referencedTableName: 'tags',
            referencedColumnNames: ['id'],
            columnNames: ['tagsId'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('courses_tags');
  }
}
