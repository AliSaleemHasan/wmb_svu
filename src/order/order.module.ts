import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/song/song.entity';
import { Invoice } from './invoice.entity';
import { Customer } from 'src/customers/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Invoice, Customer])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
