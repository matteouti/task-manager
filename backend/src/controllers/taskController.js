// backend/src/controllers/taskController.js
const db = require("../config/db.config");

exports.getAllTasks = async (req, res) => {
  try {
    const [tasks] = await db.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOneTask = async (req, res) => {
  try {
    const { id } = req.params;
    const [tasks] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const [result] = await db.query(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description]
    );

    const [newTask] = await db.query("SELECT * FROM tasks WHERE id = ?", [
      result.insertId,
    ]);

    // Émettre l'événement WebSocket immédiatement
    req.app.get("io").emit("taskCreated", newTask[0]);
    console.log("Task created event emitted:", newTask[0]);

    res.status(201).json(newTask[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    // Émettre l'événement WebSocket via la requête globale
    const io = req.app.get("io");
    io.emit("taskDeleted", id);
    console.log(" tache id : ", id);

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
