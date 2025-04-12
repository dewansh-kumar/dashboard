import mongoose from "mongoose";


const dbConnect = async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("Data base connected successfully");
    }catch(error){
        console.log("Getting error while connecting database", error)
        process.exit(1);
    }
}

export {dbConnect}

