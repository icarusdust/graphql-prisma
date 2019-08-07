import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, {prisma}, info){
        const opArgs = {
            first:args.first,
            skip:args.skip,
            after:args.after,
            orderBy:args.orderBy
        }

        if(args.query){
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            }
    }
        return prisma.query.users(opArgs, info)
    },
    myPost(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        const opArgs = {
            first:args.first,
            skip:args.skip,
            after:args.after,
            where:{
                author:{
                    id:userId
                }
            }
        }
        if(args.query){
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }
        return prisma.query.posts(opArgs,info)

    },
    posts(parent, args, {prisma}, info){
        const opArgs = {
            first:args.first,
            skip:args.skip,
            after:args.after,
            where:{
                published:true
            }
        }

        if(args.query){
            opArgs.where.OR = [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]     
        }
        return prisma.query.posts(opArgs, info)
    
    },
    comments(parent, args, { prisma }, info){
        const opArgs = {
            first:args.first,
            skip:args.skip,
            after:args.after,
        }
       return prisma.query.comments(opArgs, info)
    }
 }

 export {Query as default}