import mongoose from "mongoose";

const dbConnection = () => {
    // console.log('🔍 MONGO_URI:', process.env.MONGODB_URI); // Debug log

  return mongoose.connect(process.env.MONGODB_URI)

    .then(() => { console.log("DB connected successfully"); })

    .catch((err) => { console.log("ERROR in DB CONNECTION : ", err); })

}

export default dbConnection
