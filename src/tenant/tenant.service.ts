import { Injectable } from '@nestjs/common';
import { Tenant } from './entities/tenant.entity';
import { Student } from 'src/student/entities/student.entity';
import { QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TenantService {
  private tenant: number; // Assuming you manage the tenant as a string identifier

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Tenant) private readonly tenantRepo: Repository<Tenant>,
  ) {}

  async setCurrentTenantOnRepository<T>(
    repository: Repository<T>,
  ): Promise<void> {
    await repository.query(`SET   hog.current_tenant=${this.tenant};`);
  }

  async setCurrentTenantOnQueryRunner(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`SET  hog.current_tenant='${this.tenant}';`);
  }

  async getTenantByName(name: string): Promise<number> {
    this.tenant = (await this.tenantRepo.findOne({ where: { name: name } })).id;
    console.log(this.tenant, 'tenant');

    await this.setCurrentTenantOnRepository(this.studentRepository);

    return this.tenant;
  }
}
