const http = require("http");
const fs = require("fs");
const path = require("path");

const file_path = path.join(__dirname, "precos.txt");

function read_file() {
  return fs.readFileSync(file_path, "utf-8");
}

const server = http.createServer((req, res) => {
  if (req.url === "/precos") {
    const preco_data = read_file();
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(preco_data);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }

  if (req.url === "/atualizarPrecos" && req.method === "POST") {
    let preco_data = "";
    req.on("data", (chunk) => {
      preco_data += chunk;
    });
    req.on("end", () => {
      fs.writeFileSync(file_path, preco_data);
      console.log("Preços atualizados");
    });
  }
});

server.listen(3001, () => {
  console.log("Replica 1 running at http://localhost:3001/");
});
