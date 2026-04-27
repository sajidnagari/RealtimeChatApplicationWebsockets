const webSocketsServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");

// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
console.log("listening on port 8000");

const wsServer = new webSocketServer({
  httpServer: server,
});

const clients = {};
const allowedOrigins = new Set(["http://localhost:3000", "http://127.0.0.1:3000"]);

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

wsServer.on("request", function (request) {
  if (!allowedOrigins.has(request.origin)) {
    request.reject(403, "Origin not allowed");
    return;
  }

  var userID = getUniqueID();
  console.log(
    new Date() +
      " Recieved a new connection from origin " +
      request.origin +
      "."
  );

  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(
    "Connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  );

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      let parsedMessage;
      try {
        parsedMessage = JSON.parse(message.utf8Data);
      } catch (error) {
        console.log("Invalid JSON message:", error);
        return;
      }

      if (
        parsedMessage.type !== "message" ||
        typeof parsedMessage.msg !== "string" ||
        typeof parsedMessage.user !== "string"
      ) {
        return;
      }

      const safeMessage = JSON.stringify({
        type: "message",
        msg: parsedMessage.msg,
        user: parsedMessage.user,
      });

      // broadcasting message to all connected clients
      for (const key of Object.keys(clients)) {
        clients[key].sendUTF(safeMessage);
        console.log("sent Message to: ", key);
      }
    }
  });

  connection.on("close", function () {
    delete clients[userID];
    console.log("Disconnected:", userID);
  });
});
