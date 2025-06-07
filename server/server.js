import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { config } from "dotenv";
config()

const PORT = process.env.PORT || 5000


connectDB().then(() => {
  app.listen(PORT , () => {
    console.log(`server running on ${PORT}`)
  })
})
 






