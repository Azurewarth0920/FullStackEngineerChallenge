import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { FeedbackResolver } from './resolvers/FeedbackResolver'
import { UserResolver } from './resolvers/UserResolver'
import { ReviewResolver } from './resolvers/ReviewResolver'
import cookieParser from 'cookie-parser'

const PATH = '/'

;(async () => {
  const PORT = 3100
  const app = express()

  await createConnection()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [FeedbackResolver, UserResolver, ReviewResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  })

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  )

  app.use(cookieParser())

  apolloServer.applyMiddleware({ app, cors: false, path: PATH })

  app.listen(PORT, () => {
    console.log(`Express server started on ${PORT}`)
  })
})()
