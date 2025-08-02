import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Cliente conectado", socket.id);

    socket.on("chat:send", (data) => {
        console.log("Mensaje recibido:", data);
        io.emit("chat:receive", data);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado", socket.id);
    });
});

httpServer.listen(3000, () => {
    console.log("Socket.IO corriendo en puerto 3000");
});
