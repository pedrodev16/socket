const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express"); // <== NUEVO

const app = express();              // <== NUEVO
const httpServer = createServer(app);

// Ruta básica para que Render detecte tráfico HTTP
app.get("/", (req, res) => {
    res.send("Servidor de WebSocket funcionando ✔️");
});

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", socket => {
    console.log("Cliente conectado", socket.id);

    socket.on("chat:send", data => {
        console.log("Mensaje recibido:", data);
        io.emit("chat:receive", data);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado", socket.id);
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Socket.IO corriendo en puerto ${PORT}`);
});
