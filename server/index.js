const express = require("express");
const cors = require("cors");

let workers = [
    { id: 1, worker: "Juan", hours: 8, rate: 50 },
    { id: 2, worker: "Omar", hours: 8, rate: 40 }
];

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ ok: true });
});

app.get("/workers", (req, res) => {
    res.json(workers);
});

app.post("/workers", (req,res)=>{
    const newWorker = req.body;

    newWorker.id = workers.length
    ? Math.max(...workers.map(w=>w.id))+1
    : 1;

    workers.push(newWorker);

    res.status(201).json(newWorker);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log("API running on http://localhost:${PORT}");
});