const dotenv = require("dotenv");
const express = require("express");


const { connectMongo } = require("./db");


dotenv.config();
const app = express();
const PORT = process.env.PORT||3000;


// database:
connectMongo();


// middlewares:
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// routes:
app.get("/", (req,res)=> {
    return res.json("Heelo, dharmendra");
});

app.listen(PORT, ()=> console.log(`Server is running at http://localhost:${PORT}`));

