import { randomUUID } from 'node:crypto';
import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectOutputTags: any;
  let expectOutputCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    created_at = new Date();

    expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at,
      },
    ];
    expectOutputCourses = {
      id,
      name: 'test',
      description: 'test description',
      created_at,
      tags: expectOutputTags,
    };
  });

  mockCourseRepository = {
    create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
  };

  mockTagRepository = {
    create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
    findOne: jest.fn(),
  };

  it('should create a course', async () => {
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository

    const createCourseDTO: CreateCourseDTO = {
      name: 'test',
      description: 'test description',
      tags: ['nestjs'],
    }
    const newCourse = await service.create(createCourseDTO)
    expect(mockCourseRepository.find).toHaveBeenCalled()
    expect(expectOutputCourses).toStrictEqual(newCourse)
  })


  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
