import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { hash } from 'bcrypt';
@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async createAdminIfNotExist() {
    const adminUser = await this.customerRepository.find({
      where: { role: 'admin' },
    });

    if (adminUser.length) return;

    if (!adminUser[0]) {
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (!adminUsername || !adminPassword) {
        console.error(
          'Admin username or password is not set in environment variables.',
        );
        return;
      }

      const hashedPassword = await hash(adminPassword, 10);

      const admin = this.customerRepository.create({
        username: adminUsername,
        password: hashedPassword,
        Address: 'NA',
        email: 'admin@admin.com',
        FName: 'admin',
        LName: 'admin',
        role: 'admin',
      });

      await this.customerRepository.save(admin);

      console.log('Admin User created');
    }
  }

  async create(Customer: Partial<Customer>): Promise<Customer> {
    let hashedPassword = await hash(Customer.password, 10);
    let savedUser = this.customerRepository.save({
      ...Customer,
      role: 'customer',
      password: hashedPassword,
    });
    return savedUser;
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findById(id: number): Promise<Customer[]> {
    return this.customerRepository.find({ where: { id } });
  }

  async findByUsername(username: string): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { username } });
  }

  async update(id: number, Customer: Partial<Customer>): Promise<UpdateResult> {
    if (Customer.password)
      Customer.password = await hash(Customer.password, 10);

    console.log(Customer);

    return await this.customerRepository.update({ id }, { ...Customer });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.customerRepository.delete({ id });
  }
}
