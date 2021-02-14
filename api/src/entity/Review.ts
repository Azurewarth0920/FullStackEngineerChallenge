import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm'

import { Field, ID, ObjectType } from 'type-graphql'
import { Feedback } from './Feedback'
import { User } from './User'

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  createdAt: number

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
