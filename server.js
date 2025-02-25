import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"

import dotenv from "dotenv"

import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"


const app = express()
dotenv.config()


app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

// Routes and Middleware
app.use("/posts", postRoutes) 
app.use("/users", userRoutes)

app.get("/", (req, res) => {
  res.send("Hellow to Memories API")
})
// Connect to DB
const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message))

mongoose.set("useFindAndModify", false)
