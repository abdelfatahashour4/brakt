module.exports = createServer => {
  const IO = require("socket.io")(createServer);

  IO.on("connection", socket => {
    console.log("user is connects");
    console.log("id ", socket.id);
  });
};
