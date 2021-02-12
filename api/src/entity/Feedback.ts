import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from 'typeorm'
import { Review } from './Review'
import { User } from './User'

@Entity()
export class Feedback extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Review, (review: Review) => review.feedbacks)
  review: Review

  @ManyToOne(() => User, (user: User) => user.feedbacks)
  user: User

  @Column()
  content: string
}
