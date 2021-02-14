import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import { Field, Int, ObjectType } from 'type-graphql'
import { Feedback } from './Feedback'
import { User } from './User'

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  content: string

  @ManyToMany(() => User, (user: User) => user.reviews)
  @JoinTable()
  @Field(() => [User], { nullable: true })
  assignees: User[]

  @Field(() => [Feedback], { nullable: true })
  @OneToMany(() => Feedback, (feedback: Feedback) => feedback.review)
  feedbacks: Feedback[]
}
