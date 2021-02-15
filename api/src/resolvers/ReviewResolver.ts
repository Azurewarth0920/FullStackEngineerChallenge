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
  @Field()
  content: string

  @Field(() => [Number])
  userIds: number[]
}

@InputType()
class ReviewUpdate {
  @Field(() => String, { nullable: true })
  content?: string

  @Field(() => [Number], { nullable: true })
  userIds?: number[]
}

interface UpdateType {
  content?: string
  assignees?: User[]
}

@Resolver()
export class ReviewResolver {
  @Mutation(() => Review)
  async createReview(@Arg('option', () => ReviewCreate) option: ReviewCreate) {
    const { userIds, ...meta } = option
    const assignees = await User.getRepository().findByIds(userIds)

    return await Review.create({
      ...meta,
      assignees,
    }).save()
  }

  @Mutation(() => Review)
  async updateReview(
    @Arg('id', () => Int) id: number,
    @Arg('option', () => ReviewUpdate) { content, userIds }: ReviewUpdate
  ) {
    const updatedTarget: UpdateType = {}
    if (content) updatedTarget.content = content
    if (userIds) {
      updatedTarget.assignees = await User.getRepository().findByIds(userIds)
    }

    return await Review.update({ id }, updatedTarget)
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
