import {
  Mutation,
  Resolver,
  Arg,
  InputType,
  Field,
  Query,
  ID,
  Ctx,
} from 'type-graphql'
import { User } from '../entity/User'
import bcrypt from 'bcrypt'
import { Request } from 'express'

declare module 'express-session' {
  export interface SessionData {
    userName: { [key: string]: any }
  }
}

export interface Context {
  req: Request
}

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

  async login(
    @Arg('name', () => String) name: String,
    @Arg('password', () => String) password: String,
    @Ctx() { req }: Context
  ) {
    const foundUser = await User.findOne({ where: { name } })
    if (foundUser && bcrypt.compareSync(password, foundUser.secret)) {
      req.session.userName = name
    }
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
