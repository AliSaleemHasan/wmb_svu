import { Artist } from 'src/artist/artist.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @ManyToOne(() => Artist, (artist) => artist.songs)
  artist: Artist;
}
