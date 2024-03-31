import { Customer } from 'src/customers/customer.entity';
import { Song } from 'src/song/song.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('invoice')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  total: number;

  @Column()
  creditCard: string;

  @ManyToOne(() => Customer, (customer) => customer.invoices)
  customer: Customer;

  @ManyToMany(() => Song)
  @JoinTable({
    name: 'order',
    joinColumn: { name: 'song_id' },
    inverseJoinColumn: { name: 'invoice_id' },
  })
  songs: Song[];
}
