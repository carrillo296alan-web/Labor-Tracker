const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req,res)=>{
    res.json({ok:true});
});

const PORT = 3301;
app.listen(PORT, ()=>{
    console.log("API running on http://localhost:${PORT}");
});