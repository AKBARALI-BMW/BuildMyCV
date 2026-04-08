import mongoose from "mongoose";

const connectDB =  async () => {
    
    try{
        mongoose.connection.on("connected", ()=>{ console.log("MongoDB connected successfully"); });
    
        let mongodbURL = process.env.MONGODB_URL?.trim();
        const projectname = process.env.MONGODB_DB?.trim() || "resumebuilder";

        if(!mongodbURL){
            throw new Error("MONGODB_URL is not defined in environment variables");
        }
        if(mongodbURL.endsWith("/")){
            mongodbURL = mongodbURL.slice(0, -1);
        }
           await mongoose.connect(`${mongodbURL}/${projectname}`)

    }catch(err){
        console.error("Error while connecting to MongoDB", err.message || err);
        process.exit(1);
    }

}

export default connectDB;   