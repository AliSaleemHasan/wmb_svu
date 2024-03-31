import { Invoice } from 'src/order/invoice.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false })
  role: 'admin' | 'customer';

  @Column({ type: 'varchar' })
  FName: string;

  @Column({ type: 'varchar' })
  LName: string;

  @Column({ type: 'varchar' })
  Address: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @OneToMany(() => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];
}
