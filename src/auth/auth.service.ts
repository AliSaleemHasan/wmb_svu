import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomerService } from 'src/customers/customers.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/customers/customer.entity';

// 1000 days
const EXPIRE_TIME = 300 * 1000 * 24 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private customerSerivce: CustomerService,
    private jwtService: JwtService,
  ) {}

  //   TODO: use bcrypt to store crypted passwords
  async validateUser(username: string, pass: string): Promise<any> {
    let customer = await this.customerSerivce.findByUsername(username);

    console.log(customer);
    if (!customer) throw new UnauthorizedException();

    if (customer && (await bcrypt.compare(pass, customer.password))) {
      const { password, ...result } = customer;
      return result;
    }
    throw new UnauthorizedException();
  }

  async login(dto: Customer) {
    const customer = (await this.validateUser(
      dto.username,
      dto.password,
    )) as Customer;
    const payload = {
      username: customer.username,
      sub: customer.id,
      customer: customer,
      role: customer.role,
    };
    return {
      customer,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1000d',
          secret: process.env.JWT_ACCESS_SECRET,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1000d',
          secret: process.env.JWT_REFRESH_SECRET,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async signUp(createUserDto: Customer): Promise<Customer> {
    // Check if customer exists
    const userExists = await this.customerSerivce.findByUsername(
      createUserDto.username,
    );

    if (userExists) {
      throw new BadRequestException('customer already exists');
    }
    const newUser = await this.customerSerivce.create(createUserDto);
    delete newUser.password;

    return newUser;
  }

  async refreshToken(customer: any) {
    const payload = {
      username: customer.username,
      sub: customer.sub,
      customer: customer,
      role: customer.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1000d',
        secret: process.env.JWT_ACCESS_SECRET,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1000d',
        secret: process.env.JWT_REFRESH_SECRET,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
