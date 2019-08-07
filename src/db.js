let users = [{
    id:"12",
    name:"John",
    email:"john@test.com",
    age:"34"
},{
    id:"13",
    name:"Michael",
    email:"michael@test.com",
    age:"32"
},{
    id:"14",
    name:"Tom",
    email:"tom@test.com",
    age:"30"
}]

let posts = [{
    id:"1",
    title:"Node GraphQL",
    body:"Programming",
    author:"12"
},{
    id:"2",
    title:"Node Express",
    body:"Coding",
    author:"13"
},{
    id:"3",
    title:"Node API",
    body:"RestAPI",
    author:"14"
}]

let comments =[{
    id:"90",
    text:"Hello",
    author:"12",
    post:"1"
},{
    id:"91",
    text:"Hi",
    author:"13",
    post:"1"
},{
    id:"92",
    text:"Hey",
    author:"14",
    post:"2"
},{
    id:"93",
    text:"Tere",
    author:"14",
    post:"3"
}]

const db = {
    users, 
    posts,
    comments
}

export {db as default}