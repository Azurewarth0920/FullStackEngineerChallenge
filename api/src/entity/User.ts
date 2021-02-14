import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToMany,
} from 'typeorm'
import { Feedback } from './Feedback'
import { Field, Int, ObjectType } from 'type-graphql'
import { Review } from './Review'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ unique: true })
  name: string

  @Column()
  secret: string

  @Field()
  @Column('boolean', { default: false })
  isAdmin: boolean

  @ManyToMany(() => Review, (reviews: Review) => reviews.assignees, {
    cascade: true,
  })
  @Field(() => [Review])
  reviews: Review[]

  @Field(() => [Feedback])
  @OneToMany(() => Feedback, (feedbacks: Feedback) => feedbacks.owner)
  feedbacks: Feedback[]
}
