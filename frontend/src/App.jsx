import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://optiprods-intern.onrender.com/"; // Backend Deployment Link

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const addTask = async () => {
        if (!title.trim()) return;
        try {
            await axios.post(API_URL, { title: title.trim() });
            setTitle("");
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const toggleTask = async (id) => {
        try {
            await axios.put(`${API_URL}/${id}`);
            fetchTasks();
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <h2>To-Do List</h2>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "10px" }}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task"
                    style={{ padding: "8px", width: "70%" }}
                />
                <button onClick={addTask} style={{ padding: "8px", cursor: "pointer" }}>Add Task</button>
            </div>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {tasks.map((task) => (
                    <li key={task.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", borderBottom: "1px solid #ccc" }}>
                        <span
                            style={{ textDecoration: task.completed ? "line-through" : "none", flexGrow: 1 }}
                        >
                            {task.title}
                        </span>
                        <button onClick={() => toggleTask(task.id)} style={{ marginRight: "8px", cursor: "pointer" }}>Toggle</button>
                        <button onClick={() => deleteTask(task.id)} style={{ cursor: "pointer" }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
