// backend/src/server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    // origin: "*", // Configuration plus permissive
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
  pingTimeout: 60100, // 60 secondes avant de considérer la connexion inactive
  pingInterval: 25100, // Ping toutes les 25 secondes
});

app.use(
  cors({
    origin: "http://localhost:3000", // URL du frontend
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// WebSocket connection
io.on("connection", (socket) => {
  console.log("Client - connecté:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client déconnecté:", socket.id);
  });
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

// Rendre io accessible globalement
app.set("io", io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
