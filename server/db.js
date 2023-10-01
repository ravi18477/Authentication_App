import mongoose from 'mongoose';

const connection=async (URL_DB)=>{
   
    try{
        
        const connectionParams={
            useNewUrlParser: true,
          
            useUnifiedTopology: true 
        }

        
        await mongoose.connect(URL_DB,connectionParams);
        console.log("Database connected Successfully!");

    } catch(error){

        console.log("Error While connecting database",error);
        

    }
};



 export default connection;