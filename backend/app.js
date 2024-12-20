const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config({ path: "./config/.env" })
const bodyparser = require("body-parser")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const morgan = require("morgan")


const connectDb = require("./database/connectDb")
const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/productRoute")
const blogRouter = require("./routes/blogRoute")
const pCategoryRouter = require("./routes/productCategoryRoute")
const bCategoryRouter = require("./routes/blogCategoryRoute")
const brandRouter = require("./routes/brandRoute")
const couponRouter = require("./routes/couponRoute")
const colorRouter = require("./routes/colorRoute")
const inquiryRouter = require("./routes/inquiryRoute")
const { errorMiddleware } = require("./middlewares/errorMiddleware")

// const corsOptions = {
//     origin: process.env.FRONTEND_URI,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     Credential: true,
//     optionsSuccessStatus: 200
// }

app.use(morgan("dev"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())


app.use("/api/v1/user", userRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/blog", blogRouter)
app.use("/api/v1/product-category", pCategoryRouter)
app.use("/api/v1/blog-category", bCategoryRouter)
app.use("/api/v1/brand", brandRouter)
app.use("/api/v1/coupon", couponRouter)
app.use("/api/v1/color", colorRouter)
app.use("/api/v1/inquiry", inquiryRouter)

connectDb()

app.use(errorMiddleware)

module.exports = app