import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    @Inject('TENANT') private readonly tenant: number,
  ) {}
  private tenantId = this.tenant;

  @Get('hel')
  show() {
    return this.tenantId;
  }

  @Post('create')
  create(@Body() body: CreateStudentDto) {
    this.studentService.create(body);
  }

  @Get()
  async findAll() {
    return this.studentService.findAll();
  }
}
