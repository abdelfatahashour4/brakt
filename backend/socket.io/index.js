const {addComment, deleteComment} = require("./socket-controller");
const {
  ADD_COMMENT,
  DELETE_COMMENT,
} = require("../utilities/socket-events.json");

const {parse} = require("cookie");
const {decode} = require("jsonwebtoken");
module.exports = createServer => {
  const IO = require("socket.io")(createServer);

  IO.on("connection", socket => {
    if (socket.handshake.headers.cookie) {
      const cookie = parse(socket.handshake.headers.cookie);
      const decodeCookie = decode(cookie.user_token);
      socket.request.user = decodeCookie;
      socket.join(socket.request.user._id);
    }

    socket.on(ADD_COMMENT, data => {
      addComment(data);
    });

    socket.on(DELETE_COMMENT, data => {
      deleteComment(data);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
};
