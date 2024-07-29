const http = require("http");
const fs = require("fs");

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("Error: File not found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    const url = req.url;
    console.log(url);

    if (url === "/about") {
      renderHTML("./about.html", res);
    } else if (url === "/contact") {
      renderHTML("./contact.html", res);
    } else {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Hello World");
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("Server is listening on http://localhost:3000");
  });
