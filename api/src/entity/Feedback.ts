import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { User } from './User'
import { Review } from './Review'

@ObjectType()
@Entity()
export class Feedback extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column('text')
  content: string

  @Field(() => Int)
  @Column()
  ownerId: number

  @Field()
  @ManyToOne(() => User, (user: User) => user.feedbacks)
  @JoinColumn({ name: 'ownerId' })
  owner: User

  @Field(() => Int)
  @Column()
  reviewId: number

  @Field()
  @ManyToOne(() => Review, (review: Review) => review.feedbacks)
  @JoinColumn({ name: 'reviewId' })
  review: Review
}
