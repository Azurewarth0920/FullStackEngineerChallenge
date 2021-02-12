import { Mutation, Resolver, Arg, InputType, Field } from 'type-graphql'
import { Review } from '../entity/Review'

@InputType()
class ReviewInput {
  @Field()
  title: string

  @Field()
  content: string
}

@Resolver()
export class ReviewResolver {
  @Mutation(() => Review)
  async createReview(@Arg('options', () => ReviewInput) option: ReviewInput) {
    return await Review.create(option).save()
  }
}
