// frontend/src/components/TaskManager.js
import React, { useState, useEffect, useMemo } from "react";
import { Box, Paper } from "@mui/material";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import SearchBar from "./SearchBar";
import { io } from "socket.io-client";
import axios from "axios";

const API_URL = "http://localhost:5000/api";
//const socket = io("http://localhost:5000");
const socket = io("http://localhost:5000", {
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrage des tâches en utilisant useMemo pour l'optimisation
  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [tasks, searchTerm]);

  useEffect(() => {
    // Charger les tâches initiales
    fetchTasks();
    console.log("tache loaded");

    // Configuration des événements WebSocket
    socket.on("taskCreated", (newTask) => {
      setTasks((prev) => [newTask, ...prev]);
      console.log("New task received from WebSocket:", newTask);
      console.log("tache loaded  after created tache");
    });

    socket.on("taskDeleted", (taskId) => {
      setTasks((prev) => prev.filter((task) => task.id !== parseInt(taskId)));
      console.log(" deleted id : ", taskId);
      fetchTasks();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (task) => {
    try {
      await axios.post(`${API_URL}/tasks`, task);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <TaskForm onAddTask={handleAddTask} />
      </Box>
      <Box sx={{ mb: 3 }}>
        <SearchBar onSearch={handleSearch} />
      </Box>
      <TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask} />
    </Paper>
  );
};

export default TaskManager;
