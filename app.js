const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

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
app.use(cors());
app.use(express.json()); // supports the JSON body in posts request
app.use(express.urlencoded({extended: false}));


// routes:
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);


app.listen(PORT, ()=> console.log(`Server is running at http://localhost:${PORT}`));

