import jwt from 'jsonwebtoken';
import User from '../models/user.js';
const Authenticate=async(req,res,next)=>{
    try{
        const token=req.cookies.jwtoken;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);

        const rootuser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootuser){
            throw new Error('User Not Find');
        }

        req.token=token;
        req.rootuser=rootuser;
        req.userID=rootuser._id;
        next();
    }catch(err){
        res.status(401).send('Unauthorised: No token Provided');
        console.log(err);                  
                    
    }

}

export default Authenticate;