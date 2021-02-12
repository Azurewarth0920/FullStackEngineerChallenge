import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  OneToMany,
  BaseEntity,
} from 'typeorm'

import { Feedback } from './Feedback'
import { User } from './User'

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  createdDate: number

  @Column()
  content: string

  @Column(() => User)
  @JoinTable()
  assignedUser: User[]

  @OneToMany(() => Feedback, (feedback: Feedback) => feedback.user)
  feedbacks: Feedback[]
}
