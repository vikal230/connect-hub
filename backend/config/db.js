import mongoose from "mongoose"

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("connect database from project!")
  } catch (error) {
    console.log("database connection error!", error)
  }
}

export default connectDb;