import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { Feedback } from './Feedback'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  hashedPassword: string

  @Column()
  createdDate: number

  @Column()
  isAdmin: boolean

  @OneToMany(() => Feedback, (feedback: Feedback) => feedback.user)
  feedbacks: Feedback[]
}
