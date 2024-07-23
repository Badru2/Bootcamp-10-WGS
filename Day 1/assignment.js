// For Console
var nama = "Hilal";
var umur = 18;
console.log("Nama Saya: " + nama + "\n" + "Umur Saya: " + umur);

// For Web
var http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("Nama Saya: " + nama + "<br>" + "Umur Saya: " + umur);
    res.end();
  })
  .listen(8080);
