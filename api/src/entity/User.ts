import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  ManyToMany,
} from 'typeorm'
import { Feedback } from './Feedback'
import { Field, ID, ObjectType } from 'type-graphql'
import { Review } from './Review'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  name: string

  @Field()
  @Column()
  secret: string

  @Field()
  @Column()
  createdAt: number

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
