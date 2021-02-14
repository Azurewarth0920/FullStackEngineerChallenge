import { User } from '../entity/User'
import {
  Mutation,
  Resolver,
  Arg,
  InputType,
  Field,
  Query,
  ID,
} from 'type-graphql'
import { Review } from '../entity/Review'

@InputType()
class ReviewCreate {
  @Field()
  content: string

  @Field(() => [String])
  userIds: string[]
}

@InputType()
class ReviewUpdate {
  @Field(() => String, { nullable: true })
  content?: string

  @Field(() => [String], { nullable: true })
  userIds?: string[]
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
      createdAt: new Date().getTime(),
      assignees,
    }).save()
  }

  @Mutation(() => Review)
  async updateReview(
    @Arg('id', () => ID) id: string,
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
  async deleteReview(@Arg('id', () => ID) id: string) {
    await Review.delete({ id })
    return true
  }

  @Query(() => Review)
  review(@Arg('id', () => ID) id: string) {
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
