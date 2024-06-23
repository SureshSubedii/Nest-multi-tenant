import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student/entities/student.entity';
import { Repository } from 'typeorm';

@Controller('hello')
export class AppController {
  constructor(
    @InjectRepository(Student) private readonly stdRepo: Repository<Student>,
  ) {}

  @Get()
  async getHello() {
    return await this.stdRepo.find();
  }
}
