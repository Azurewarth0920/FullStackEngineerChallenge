import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from './User'
import { Review } from './Review'

@ObjectType()
@Entity()
export class Feedback extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  createdAt: number

  @Field()
  @Column()
  content: string

  @Field()
  @Column()
  ownerId: string

  @Field()
  @ManyToOne(() => User, (user: User) => user.feedbacks)
  @JoinColumn({ name: 'ownerId' })
  owner: User

  @Field()
  @Column()
  reviewId: string

  @Field()
  @ManyToOne(() => Review, (review: Review) => review.feedbacks)
  @JoinColumn({ name: 'reviewId' })
  review: Review
}
