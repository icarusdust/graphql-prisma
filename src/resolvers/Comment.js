const Comment = {
    post(parent, args, { prisma }, info){
        return prisma.query.posts(null, info)
    }
}

export {Comment as default}