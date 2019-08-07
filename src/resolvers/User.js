import getUserId from '../utils/getUserId'
import { resolvers } from '.';

const User = {
    posts(parent, args, { prisma }, info){
        return prisma.query.posts(null, info)
    },
    comments(parents, args, { prisma }, info){
        return prisma.query.comments(null, info)
    },
    posts:{
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, {prisma}, info){
            return prisma.query.posts({
                where:{
                    published:true,
                    author:{
                        id:parent.id
                    }
                }

            })
        }
    },
    email:{
        fragment:'fragment userId on User { id }',
        resolve(parent, args, { request }, info){
        const userId = getUserId(request, false)
        if(userId && userId === parent.id){
            return parent.email;
        } else {
            return null;
        }
    }
 }

}

export { User as default }