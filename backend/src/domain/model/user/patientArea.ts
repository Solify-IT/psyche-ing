import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { User } from '..';

@Entity()
export default class PatientArea {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  checked: boolean;

  @ManyToOne(() => User, (user) => user.patientAreas)
  @JoinColumn()
  user?: User;

  @Column()
  userId: number;
}
