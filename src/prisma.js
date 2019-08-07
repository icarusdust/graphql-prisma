import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from '../src/resolvers/index'

const prisma = new Prisma({
    typeDefs:"src/generated/prisma.graphql",
    endpoint:"http://localhost:4466",
    secret: "thisisexamplesecretkey",
    fragmentReplacements
})

export { prisma as default }


// prisma.query.users(null, "{ id name post {id title} }").then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
// })


// prisma.query.comments(null, "{id text author { id name } }").then(data =>{
//     console.log(data)
// })
// prisma.mutation.createPost({
//     data:{
//         title:"Prisma Node",
//         body:"GraphQL",
//         published:true,
//         author:{
//             connect:{
//                 id:"cjyh7ceuf017u0794knr2of8l"
//             }
//         }
//     }
// }, "{id title body}").then(data => {
//     return prisma.query.posts(null, "{id title body}")
// }).then(data =>{
//     console.log(JSON.stringify(data, undefined, 2))
// })




// const createdPost = async(authorId, data) => {
//     const userExists = await prisma.exists.User({id:authorId})

//     if(!userExists){
//         throw new Error("User not found!")
//     }

//     const post = await prisma.mutation.createPost({
//         data:{
//             ...data,
//             author:{
//                 connect:{
//                     id:authorId
//                 }
//             }
//         }
//     },"{id title author{id name}}")

//     return post.author;
// }

// createdPost("cjyh0zrup00fg0794eh7yzrit",{
//     title:"New postii",
//     body:"boyyy",
//     published:true
// }).then(res =>{
//     console.log(res)
// }).catch(error=>{
//     console.log(error.message)
// })


// const updatedPost = async(postId, data) =>{
//     const postExists = await prisma.exists.Post({id:postId})

//     if(!postExists){
//         throw new Error("Post not found!")
//     }

//     const post = await prisma.mutation.updatePost({
//         where:{
//             id:postId
//         },
//         data:{
//             ...data
//         }
//     }, "{id title body}")
//     return post;
// }

// updatedPost("cjygejsv600de07946r0b29yy",{
//     title:"Prisma in the town",
//     body:"New graphql is in power",
//     published:false
// }).then(post =>{
//     console.log(post)
// }).catch(error =>{
//     console.log(error.message)
// })