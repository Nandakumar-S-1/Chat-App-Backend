import jwt from 'jsonwebtoken'
import User from '../Models/User'
const authMid = async(req,res,next)=>{
    const token = req.header('Authorization')?.replace('Bearer ','')
    if(!token){
        return res.status(401).json({message:'No Token has been Provided'})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findOne(decoded.userId)

        if(!user){
            return res.status(404).json({message:'user not found here '})
        }

        req.user=user
        next()
    } catch (error) {
        res.status(401).json({message:'Invalid Token given'})
    }
}

export default authMid