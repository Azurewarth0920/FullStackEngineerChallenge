import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { FeedbackResolver } from './resolvers/FeedbackResolver'
import { UserResolver } from './resolvers/UserResolver'
import { ReviewResolver } from './resolvers/ReviewResolver'
import { sessionMiddleware } from './middlewares/session'

const PATH = '/graphql'

;(async () => {
  const PORT = 3100
  const app = express()

  await createConnection()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [FeedbackResolver, UserResolver, ReviewResolver],
    }),
    context: ({ req, res }) => ({ req, res, session: req.session }),
  })

  app.use(PATH, sessionMiddleware)

  apolloServer.applyMiddleware({ app, cors: true, path: PATH })

  app.listen(PORT, () => {
    console.log(`Express server started on ${PORT}`)
  })
})()
