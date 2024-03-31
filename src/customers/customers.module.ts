import { Module } from '@nestjs/common';
import { CustomerService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { UsersController } from './customers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService],
  exports: [CustomerService],
  controllers: [UsersController],
})
export class UsersModule {
  constructor(private customerService: CustomerService) {}
  onModuleInit() {
    this.customerService.createAdminIfNotExist();
  }
}
