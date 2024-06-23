// tenant/tenant.module.ts
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { TenantService } from './tenant.service';
import { Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Student } from 'src/student/entities/student.entity';

const tenantFactoryFromRequest = {
  provide: 'TENANT',
  scope: Scope.REQUEST,
  useFactory: (req, tenantService: TenantService) => {
    const tenantName = req.headers.host.split('.')[0];

    console.log(tenantService.getTenantByName(tenantName)); //  Extract tenant name from host
    return tenantService.getTenantByName(tenantName);
  },
  inject: [REQUEST, TenantService],
};

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Tenant, Student])],
  providers: [TenantService, tenantFactoryFromRequest],
  exports: ['TENANT'],
})
export class TenantModule {}
