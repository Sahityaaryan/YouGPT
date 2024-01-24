import jwt from 'jsonwebtoken'



export default async function token(user){

    return await (jwt.sign(user,process.env.SECRET_KEY,{expiresIn:'24h'}))
}
