import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customers/customer.entity';
import { AuthController } from './auth.controller';
import { CustomerService } from 'src/customers/customers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [AuthService, JwtService, CustomerService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
