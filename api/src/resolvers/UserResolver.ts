import {
  Mutation,
  Resolver,
  Arg,
  InputType,
  Field,
  Query,
  Ctx,
  Int,
} from 'type-graphql'
import { User } from '../entity/User'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { AuthenticationError } from 'apollo-server-express'
require('dotenv').config()

export interface Context {
  req: Request
  res: Response
}

interface DecodedToken {
  id: number
  exp: number
}

const AdminGuard = async (req: Request) => {
  if (!jwt.verify(req.cookies.id, process.env.JWT_SECRET as string))
    new AuthenticationError('Login is required.')

  const { id } = jwt.decode(req.cookies.id) as DecodedToken

  const targetUser = await User.findOne({
    id,
  })

  if (!targetUser?.isAdmin) {
    new AuthenticationError('Authorization Request Denied.')
  }
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
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
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
          id: foundUser.id,
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
    @Arg('id', () => Int) id: number,
    @Arg('option', () => UserUpdate) option: UserUpdate,
    @Ctx() { req }: Context
  ) {
    await AdminGuard(req)

    const { password, ...meta } = option

    await User.update(
      { id },
      {
        ...meta,
        secret: bcrypt.hashSync(password, 8),
      }
    )
    return true
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number, @Ctx() { req }: Context) {
    await AdminGuard(req)

    await User.delete({ id })
    return true
  }

  @Query(() => User)
  async user(@Ctx() { req }: Context) {
    // validate
    if (!jwt.verify(req.cookies.id, process.env.JWT_SECRET as string))
      new AuthenticationError('auth error.')

    const { id } = jwt.decode(req.cookies.id) as DecodedToken

    return await User.findOne(id, {
      relations: ['feedbacks', 'reviews'],
    })
  }

  @Query(() => [User])
  async users(@Ctx() { req }: Context) {
    await AdminGuard(req)

    return User.find({
      relations: ['feedbacks', 'reviews'],
    })
  }
}
