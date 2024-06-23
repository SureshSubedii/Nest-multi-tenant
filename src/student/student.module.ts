import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), TenantModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentModule, TypeOrmModule],
})
export class StudentModule {}
