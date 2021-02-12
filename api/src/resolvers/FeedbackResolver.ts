import { Mutation, Resolver, Arg, InputType, Field } from 'type-graphql'
import { Feedback } from '../entity/Feedback'

@InputType()
class FeedbackInput {
  @Field()
  title: string

  @Field()
  content: string
}

@Resolver()
export class FeedbackResolver {
  @Mutation(() => Feedback)
  async createFeedback(
    @Arg('options', () => FeedbackInput) option: FeedbackInput
  ) {
    return await Feedback.create(option).save()
  }
}
