const express = require("express");
const app = express();
require("dotenv").config()

const userRoute = require("./routes/User");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payment");
const courseRoute = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
// const fileUpload = require("express-fileuplaod");
const PORT = process.env.PORT || 4000;

//database connect
database();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

// app.use(
//     fileUpload({
//         useTempFiles : true,
//         tempFileDir : "/tmp"
//     })
// )

//connect with cloudinary
cloudinaryConnect()

//routes
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/course",courseRoute);

//define default route
app.get("/",(req,res)=>{
    return res.json({
        success : true,
        message : "your server is up and running "
    })
})

app.listen(PORT,()=>{
    console.log(`app is running at port : ${PORT}`);
})