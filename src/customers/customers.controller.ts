import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customers.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Customer } from './customer.entity';
@Controller('customers')
export class UsersController {
  constructor(private customerService: CustomerService) {}

  // just for now for testing purposes
  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Get('')
  async getAllUsers() {
    const users = await this.customerService.findAll();
    return { data: users, success: true };
  }

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Post('create')
  async createUser(@Body() user: Partial<Customer>) {
    let newUser = await this.customerService.create(user);
    delete newUser.password;
    return { data: newUser, success: 'user has been created successfuly!' };
  }

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const deleteResult = await this.customerService.remove(+id);
    return { data: deleteResult, success: 'User has been deleted!' };
  }

  @Roles(['admin'])
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: Partial<Customer>) {
    const UpdateResult = await this.customerService.update(+id, body);
    return { data: UpdateResult, success: 'User has been updated!' };
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.customerService.findById(+id);
    return { data: user, success: true };
  }
}
