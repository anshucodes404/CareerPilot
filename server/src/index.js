import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({path: './.env'})

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`App is being listened on port: ${PORT}`);
  });
})
.catch((error) => {
   console.log("MongoDB connection failed: ", error)
})
