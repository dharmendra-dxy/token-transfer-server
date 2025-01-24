const express = require("express");


const app = express();
const PORT = 8000;

// middlewares:


// routes:
app.get("/", (req,res)=> {
    return res.json("Heelo, dharmendra");
});

app.listen(PORT, ()=> console.log("Server is running at 8000"));

