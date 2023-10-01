import express from 'express';
import { signupUser, loginUser} from '../controller/usercontroller.js';
import User from '../models/user.js';
import Authenticate from '../middleware/authenticate.js';
const router=express.Router();

router.post("/signup",signupUser);
router.post("/signin",loginUser);

router.get('/about',Authenticate,(req,res)=>{
    console.log("hello my About");
    res.send(req.rootuser);
})


router.get('/getdata',Authenticate,(req,res)=>{
    console.log("hello my getdata");
    res.send(req.rootuser);
})

router.post('/contact',Authenticate,async(req,res)=>{
    //    res.send("Hello Contact world from the server")
    
    try{
         const { name ,email,phone,message}=req.body;
          
         if(!name || !email || !phone || !message){
            return  res.json({error: "please fill the contact form"});
         }

         const userContact = await User.findOne({_id : req.userID});

         if(userContact){
            const userMessage= await userContact.addMessage(name,email,phone,message)
            await userContact.save();
            res.status(201).json({message:"user Contact Successfully"});
            
         }

    }catch(error){
        console.log(error);

    }
});

router.get('/logout',(req,res)=>{
    console.log("hello my Logout");
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send('User logout');
})

export default router;