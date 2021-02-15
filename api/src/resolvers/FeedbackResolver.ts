import {
  Mutation,
  Resolver,
  Arg,
  InputType,
  Field,
  Query,
  Int,
} from 'type-graphql'
import { Feedback } from '../entity/Feedback'

@InputType()
class FeedbackCreate {
  @Field()
  content: string

  @Field()
  ownerId: number

  @Field()
  reviewId: number
}

@Resolver()
export class FeedbackResolver {
  @Mutation(() => Feedback)
  async createFeedback(
    @Arg('option', () => FeedbackCreate) option: FeedbackCreate
  ) {
    return await Feedback.create(option).save()
  }

  @Mutation(() => Boolean)
  async updateFeedback(
    @Arg('id', () => Int) id: number,
    @Arg('content', () => String) content: string
  ) {
    await Feedback.update(
      { id },
      {
        content,
      }
    )
    return true
  }

  @Mutation(() => Boolean)
  async deleteFeedback(@Arg('id', () => Int) id: number) {
    await Feedback.delete({ id })
    return id
  }

  @Query(() => Feedback)
  feedback(@Arg('id', () => Int) id: number) {
    return Feedback.findOne(id, {
      relations: ['owner', 'review'],
    })
  }

  @Query(() => [Feedback])
  feedbacks() {
    return Feedback.find({
      relations: ['owner', 'review'],
    })
  }
}
