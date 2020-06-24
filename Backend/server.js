var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var allUsers = [];

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("userName", (res) => {
    let { username } = res;
    let user = {
      username,
      id: socket.id,
    };
    allUsers = [...allUsers, user];
    io.emit("allUsers", { allUsers });
    console.log(`Total Users Connected in chat are ${allUsers.length}`);
  });
  //   return { id: socket.id };
  io.emit("allUsers", { allUsers });
  socket.on("message", () => {
    console.log("In message");
    socket.emit("message", { message: "hello" });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    allUsers = allUsers.filter((user) => user.id !== socket.id);
    io.emit("allUsers", { allUsers });
    console.log(`Total Users Connected in chat are ${allUsers.length}`);
  });
  socket.emit("connectId", { id: socket.id });
});

http.listen(3030, () => {
  console.log("listening on *:3030");
});
