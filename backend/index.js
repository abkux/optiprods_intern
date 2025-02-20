/*
Since this app isn't that big, we will not split the code into routes, controller.
*/
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

let tasks = [];
let idCounter = 1;

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// POST a new task
app.post("/tasks", (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const newTask = { id: idCounter++, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT update task status
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id == id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    task.completed = !task.completed;
    res.json(task);
});

// DELETE a task
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));