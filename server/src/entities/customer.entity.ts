import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Index({ unique: true })
  @Column({ nullable: true })
  email: string;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Index()
  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  middlename: string;

  @Index()
  @Column({ nullable: true })
  lastname: string;

  @Column({ type: 'smallint', unsigned: true, default: true })
  is_active: boolean;

  @Column({ type: 'date', nullable: true })
  dob: string;

  @Column({ length: 128 })
  password: string;

  @Column({ type: 'smallint', unsigned: true, nullable: true })
  gender: number;
}
