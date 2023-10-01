import express from 'express';
import User from "../models/user.js";
import becrypt from "bcryptjs";
import jwt from 'jsonwebtoken';





export const signupUser=async (request,response)=>{
    console.log("hi");
   console.log(request.body);
//    response.json({message:request.body});





    try{
       
        const {name,email,work,phone,password,cpassword}=request.body;
       
        if(!name || !email|| !work || !phone || !password || !cpassword ){
            console.log
        return response.status(422).json({error:"Please fill the field properly"})};
        
        
       if(password!=cpassword){
        return response.status(422).json({error:"Password does not match"});}
       

        const usermailexist=await User.findOne({email:email});
       
        if(usermailexist){
            return response.status(422).json({error:"Email already exist"})
        }
        const userphoneexist=await User.findOne({phone:phone});
        if(userphoneexist){
            return response.status(422).json({error:"Phone number already exist"})
        }

        const newuser= new User({name,email,work,phone,password,cpassword});
        await newuser.save();
         return response.status(200).json({msg:'signup Successfully'});

}
catch(error){

    return response.status(500).json({msg:'Error while signup the user'});

}

};




export const loginUser= async(request,response)=>{

    try{
      
        let token;

        const {email,password}=request.body;
        
     
     if(!email || !password){
        
        return response.status(422).json({msg:"Please fill the field properly"});
     }
     
     const userlogin= await User.findOne({email:email});
     

     if(userlogin){
        const ismatchUser= await becrypt.compare(password,userlogin.password);
        
        token= await userlogin.generateAuthToken();
        console.log(token);

        response.cookie("jwtoken",token,{
            expires:new Date(Date.now()+25892000000),
            httpOnly:true 
        })
     console.log("hi");
        if(ismatchUser){
            console.log("user logged in successfully");
            return response.status(200).json({msg:"user logged in successfully"});
        }
        else{
            return response.status(422).json({msg:"Invalid Credentials"});  
        }
        
     }
     else{
        return response.status(422).json({msg:"Invalid Credentials"});
     }

    }
    catch(error){

        return response.status(500).json({msg:'Error while signin the user'});
    
    }
      

}


