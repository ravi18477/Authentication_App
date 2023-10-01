import mongoose from "mongoose";
import becrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


const userSchema=mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique:true
        
    },
    work:{
        type:String,
        required: true,
    },
    phone:{
        type:Number,
        required: true,
        unique:true,
    
    },
    password:{
         type:String,
         required:true

    },
    cpassword:{
        type:String,
        required: true,
        
    },
    date:{
        type:Date,
        dafault:Date.now
    },
    messages:[
        {
            name:{
                type:String,
                required:true,
            },
            email:{
                type:String,
                required:true,
            },
            phone:{
                type:String,
                required:true,
            },
            message:{
                type:String,
                required:true,
            }
        }
    ],
    tokens:[
        {
        token:{
          type:String,
          required:true
        } 
    }
    ]   
}
);

userSchema.pre('save',async function(next){
    console.log("hi");
   if(this.isModified('password')){
    this.password=await becrypt.hash(this.password,12);
    this.cpassword=await becrypt.hash(this.cpassword,12);
   }
   next();
});

userSchema.methods.generateAuthToken = async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error){
      console.log(error);}
};

userSchema.methods.addMessage=async function(name ,email,phone,message){
    try{
           this.messages=this.messages.concat({name ,email,phone,message});
           await this.save();
           return this.messages;
    }catch(error){
        console.log(error);
    }
}


const User = mongoose.model('user',userSchema);

export default User;