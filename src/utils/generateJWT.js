import jwt from 'jsonwebtoken'

const generateJWT = (id) => {
    return jwt.sign({userId: id}, "thisismysecret", {expiresIn:"7 days"})
}

export {generateJWT as default}