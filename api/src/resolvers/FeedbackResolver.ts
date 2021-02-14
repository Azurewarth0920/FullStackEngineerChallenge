import {
  Mutation,
  Resolver,
  Arg,
  InputType,
  Field,
  Query,
  ID,
} from 'type-graphql'
import { Feedback } from '../entity/Feedback'

@InputType()
class FeedbackCreate {
  @Field()
  content: string

  @Field()
  ownerId: string

  @Field()
  reviewId: string
}

@InputType()
class FeedbackUpdate {
  @Field()
  content: string
}

@Resolver()
export class FeedbackResolver {
  @Mutation(() => Feedback)
  async createFeedback(
    @Arg('option', () => FeedbackCreate) option: FeedbackCreate
  ) {
    return await Feedback.create({
      ...option,
      createdAt: new Date().getTime(),
    }).save()
  }

  @Mutation(() => Boolean)
  async updateFeedback(
    @Arg('id', () => ID) id: string,
    @Arg('content', () => FeedbackUpdate) content: FeedbackUpdate
  ) {
    await Feedback.update({ id }, content)
  }

  @Mutation(() => Boolean)
  async deleteFeedback(@Arg('id', () => ID) id: string) {
    await Feedback.delete({ id })
  }

  @Query(() => Feedback)
  feedback(@Arg('id', () => ID) id: string) {
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
