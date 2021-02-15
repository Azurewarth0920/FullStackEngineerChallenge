import { User } from '../entity/User'
import {
  Mutation,
  Resolver,
  Arg,
  InputType,
  Field,
  Query,
  Int,
} from 'type-graphql'
import { Review } from '../entity/Review'

@InputType()
class ReviewCreate {
  @Field(() => String)
  content: string

  @Field(() => [Number])
  userIds: number[]
}

@InputType()
class ReviewUpdate {
  @Field(() => String)
  content: string

  @Field(() => [Number])
  userIds: number[]
}

@Resolver()
export class ReviewResolver {
  @Mutation(() => Review)
  async createReview(
    @Arg('option', () => ReviewCreate) { content, userIds }: ReviewCreate
  ) {
    const assignees = await User.getRepository().findByIds(userIds)

    return await Review.create({
      content,
      assignees,
    }).save()
  }

  @Mutation(() => Boolean)
  async updateReview(
    @Arg('id', () => Int) id: number,
    @Arg('option', () => ReviewUpdate) { content, userIds }: ReviewUpdate
  ) {
    const assignees = await User.getRepository().findByIds(userIds)
    await Review.update(
      { id },
      {
        content,
        assignees,
      }
    )
    return true
  }

  @Mutation(() => Boolean)
  async deleteReview(@Arg('id', () => Int) id: number) {
    await Review.delete({ id })
    return true
  }

  @Query(() => Review)
  review(@Arg('id', () => Int) id: number) {
    return Review.findOne(id, {
      relations: ['assignees', 'feedbacks'],
    })
  }

  @Query(() => [Review])
  reviews() {
    return Review.find({
      relations: ['assignees', 'feedbacks'],
    })
  }
}
