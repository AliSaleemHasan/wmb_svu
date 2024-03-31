import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { In, Repository } from 'typeorm';
import { Customer } from 'src/customers/customer.entity';
import { Song } from 'src/song/song.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Customer) private customerRepositry: Repository<Customer>,
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}

  async getAllInvoices() {
    return await this.invoiceRepository.find({ relations: { customer: true } });
  }

  async makeOrder(
    customerId: number,
    songIds: number[],
    invoice: Partial<Invoice>,
  ) {
    let customer = await this.customerRepositry.findOne({
      where: { id: customerId },
    });
    if (!customer) throw new NotFoundException('Customer Not found');

    let songs = await this.songRepository.find({ where: { id: In(songIds) } });

    let totalPrice = songs.reduce((acc, cur) => acc + cur.price, 0);

    invoice.total = totalPrice;

    invoice.customer = customer;

    let newInvoice = await this.invoiceRepository.create(invoice);
    newInvoice.songs = songs;

    return await this.invoiceRepository.save(newInvoice);
  }
}
