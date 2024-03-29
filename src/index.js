import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import { resolvers, fragmentReplacements } from '../src/resolvers/index'
import prisma from'./prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs:"./src/schema.graphql",
    resolvers,
    context(request){
        return {
            db,
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements
})

server.start(() => {
    console.log("Server started at port 4000")
})

