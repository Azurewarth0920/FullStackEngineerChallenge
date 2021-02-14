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
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
require('dotenv').config()

declare module 'express-session' {
  export interface SessionData {
    userName: { [key: string]: any }
  }
}

export interface Context {
  req: Request
  res: Response
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

  @Mutation(() => User)
  async login(
    @Arg('name', () => String) name: String,
    @Arg('password', () => String) password: String,
    @Ctx() { res }: Context
  ) {
    const foundUser = await User.findOne({ where: { name } })

    if (foundUser && bcrypt.compareSync(password, foundUser.secret)) {
      const token = jwt.sign(
        {
          userId: name,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '7d' }
      )

      res.cookie('id', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    return foundUser
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
  user(@Arg('id', () => ID) id: string, @Ctx() { req }: Context) {
    console.log(req)
    return User.findOne(id, {
      relations: ['feedbacks', 'reviews'],
    })
  }

  @Query(() => [User])
  users(@Ctx() { req }: Context) {
    console.log(jwt.verify(req.cookies.id, process.env.JWT_SECRET as string))

    return User.find({
      relations: ['feedbacks', 'reviews'],
    })
  }
}
