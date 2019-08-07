import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'
import generateJWT from '../utils/generateJWT'
import { resolve } from "dns";

const Mutation = {
    async createUser(parent, args, { prisma }, info){
    //   const existingEmail = await prisma.exists.User({ email: args.data.email })

    //   if(existingEmail){
    //       throw new Error("Email is in use!")
    //   }
      if(args.data.password.length < 9){
          throw new Error("Password characters must be 9 or longer")
      }

      const password = await bcrypt.hash(args.data.password, 10)

      const user = await prisma.mutation.createUser({ 
          data:{
              ...args.data,
              password
          }
       })
       return {
           user,
           token: generateJWT(user.id)
       }
    },
    async login(parent, args, { prisma }, info){
        const user = await prisma.query.user({
            where:{
                email: args.data.email
            }
        })

        if(!user){
            throw new Error("Unable to login")
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if(!isMatch){
            throw new Error("Unable to login!")
        }

        return {
            user,
            token:generateJWT(user.id)
        }

    },
    async updateUser(parent, args, { prisma, request }, info){
      const userId = getUserId(request)
      const existingUser = await prisma.exists.User({id:args.id})

      if(!existingUser){
          throw new Error("User not found!")
      }
      if(typeof args.data.password === "string"){
          args.data.password = await bcrypt.hash(args.data.password, 10) 
      }
      return prisma.mutation.updateUser({
          where:{
              id:userId
          },
          data:args.data
      }, info)

    },
   async deleteUser(parent, args, { prisma, request }, info){
       const userId = getUserId(request)
       const existingUser = await prisma.exists.User({ id:args.id })

       if(!existingUser){
           throw new Error("User not found")
       }

        return prisma.mutation.deleteUser({
            where:{
                id:userId
            }
        }, info)
    },
   async createPost(parent, args, {prisma, request}, info){
       const userId = getUserId(request)

        return prisma.mutation.createPost({
            data:{
                ...args.data,
                author:{
                    connect:{
                        id:userId
                    }
                }
            }
        }, info)
    },
  async updatePost(parent, args, { prisma, request }, info){
        const userId = getUserId(request)
        const postExisting = await prisma.exists.Post({
            id:args.id,
            author:{
                id:userId
            }
        })

        if(!postExisting){
            throw new Error("Unable to update post")
        }

        return prisma.mutation.updatePost({
            where:{
                id:args.id
            },
            data:args.data
        }, info) 

    },
  async deletePost(parent, args, { prisma,request }, info){
        const userId = getUserId(request)
        const postExists = await prisma.exists.Post({
            id:args.id,
            author:{
                id:userId
            }
        })

        if(!postExists){
            throw new Error("Unable to delete post")
        }
       return prisma.mutation.deletePost({
           where:{
               id:args.id
           }
       },info)

    },
    createComment(parent, args, { prisma, request}, info){
        const userId = getUserId(request)
        return prisma.mutation.createComment({
            data:{
                ...args.data,
                author:{
                    connect:{
                        id:userId
                    }
                },
                post:{
                    connect:{
                        id:args.data.post
                    }
                }
            }
        }, info)

    },
    async updateComment(parent, args, { prisma, request }, info){
            const userId = getUserId(request)
            const commentExisting = await prisma.exists.Comment({
                id:args.id,
                author:{
                    id:userId
                }
            })

            if(!commentExisting){
                throw new Error("Unable to update comment")
            }
            return prisma.mutation.updateComment({
                where:{
                    id:args.id
                },
                data:args.data
            }, info)
    },
  async deleteComment(parent, args, { prisma, request }, info){
      const userId = getUserId(request)
      const commentExisting = await prisma.exists.Comment({
          id:args.id,
          author:{
              id:userId
          }
      })

      if(!commentExisting){
        throw new Error("Unable to delete comment")
      }
      return prisma.mutation.deleteComment({
          where:{
              id:args.id
          }
      }, info)
  },
}

export { Mutation as default }
