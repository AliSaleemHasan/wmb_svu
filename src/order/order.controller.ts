import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { Invoice } from './invoice.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Get('')
  async getAllInvoices() {
    return {
      data: await this.orderService.getAllInvoices(),
    };
  }

  @UseGuards(JwtGuard)
  @Post('')
  async addOrder(
    @Body()
    body: {
      customerId: number;
      songIds: number[];
      invoice: Partial<Invoice>;
    },
  ) {
    return {
      data: await this.orderService.makeOrder(
        body.customerId,
        body.songIds,
        body.invoice,
      ),
    };
  }
}
