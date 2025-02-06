const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");

const { connectMongo } = require("./db");

const userRoutes = require("./routes/user.routes");  
const accountRoutes = require("./routes/account.routes");  

// instances:
dotenv.config();
const app = express();
const PORT = process.env.PORT||3000;


// database:
connectMongo();


// middlewares:
app.use(cookieParser());
app.use(express.json()); // supports the JSON body in posts request
app.use(express.urlencoded({extended: false}));

const corsOption = {
    origin: "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOption));

// routes:
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);


app.listen(PORT, ()=> console.log(`Server is running at http://localhost:${PORT}`));

