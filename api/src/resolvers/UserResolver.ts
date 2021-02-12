import { Mutation, Resolver, Arg, InputType, Field, Int } from 'type-graphql'

import { User } from '../entity/User'

@InputType()
class UserInput {
  @Field()
  name: string

  @Field()
  hashedPassword: string

  @Field(() => Int)
  createdDate: number

  @Field()
  isAdmin: boolean
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg('options', () => UserInput) option: UserInput) {
    return await User.create(option).save()
  }
}
