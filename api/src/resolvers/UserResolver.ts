import {
  Mutation,
  Resolver,
  Arg,
  InputType,
  Field,
  Query,
  ID,
} from 'type-graphql'
import { User } from '../entity/User'
import bcrypt from 'bcrypt'

@InputType()
class UserCreate {
  @Field()
  name: string

  @Field()
  password: string

  @Field()
  isAdmin: boolean
}

@InputType()
class UserUpdate {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  password?: string

  @Field(() => Boolean, { nullable: true })
  isAdmin?: boolean
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg('option', () => UserCreate) option: UserCreate) {
    const { password, ...meta } = option

    return await User.create({
      ...meta,
      createdAt: new Date().getTime(),
      secret: bcrypt.hashSync(password, 8),
    }).save()
  }

  @Mutation(() => Boolean)
  async updateUser(
    @Arg('id', () => ID) id: string,
    @Arg('option', () => UserUpdate) option: UserUpdate
  ) {
    await User.update({ id }, option)
    return true
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => ID) id: string) {
    await User.delete({ id })
    return true
  }

  @Query(() => User)
  user(@Arg('id', () => ID) id: string) {
    return User.findOne(id, {
      relations: ['feedbacks', 'reviews'],
    })
  }

  @Query(() => [User])
  users() {
    return User.find({
      relations: ['feedbacks', 'reviews'],
    })
  }
}
