import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Unique,
} from 'typeorm';

export enum Gender {
  Male = 'M',
  Female = 'F',
}
@Entity({ name: 'artists' })
@Unique(['FName', 'LName'])
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: 'varchar' })
  FName: string;

  @PrimaryColumn({ type: 'varchar' })
  LName: string;

  @Column({})
  country: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Male,
  })
  gender: Gender;
}
