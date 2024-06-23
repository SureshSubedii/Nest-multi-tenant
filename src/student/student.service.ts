// student/student.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
// import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    // private readonly tenantService: TenantService,
  ) {}

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
  async create(student) {
    const newStudent = await this.studentRepository.create({ ...student });
    return this.studentRepository.save(newStudent);
  }

  // async findAllTenantScoped(): Promise<Student[]> {
  //   const currentTenant = this.tenantService.getCurrentTenant(); // Get current tenant
  //   return await this.studentRepository.find({
  //     where: { tenantId: currentTenant.id },
  //   });
  // }
}
