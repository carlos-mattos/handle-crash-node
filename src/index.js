const http = require("node:http");
const fs = require("fs");

const requestListener = function (req, res) {
  try {
    setTimeout(() => {
      // crash example
      throw new Error("SET TIMEOUT ERROR");
    }, 1000);

    Promise.reject(new Error("PROMISE REJECT ERROR")); // crash example

    fs.createReadStream("does-not-exist.txt"); // crash example

    res.writeHead(200);
    res.end();
  } catch (error) {
    console.log("\nCATCH COULD HANDLE ERROR");
    res.writeHead(500);
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});

process.on("uncaughtException", (error) => {
  console.log("\n", error.message);
});

process.on("unhandledRejection", (error) => {
  console.log("\n", error);
});
