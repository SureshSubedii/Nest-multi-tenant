import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['name']) // Apply Unique constraint to the 'name' column
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // Set 'name' to not null
  name: string;
}
