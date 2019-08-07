import jwt from 'jsonwebtoken'

const getUserId = (request, requireAuth = true) => {
    const header = request.request.headers.authorization

    if(header){
        const token = header.replace("Bearer ", "")
        const decode = jwt.verify(token, "thisismysecret")
    
        return decode.userId
      
    }
    if(requireAuth){
      throw new Error("Header not found!")
    }
    return null;
}

export { getUserId as default }