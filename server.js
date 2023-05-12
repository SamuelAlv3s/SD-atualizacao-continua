const http = require("http");
const fs = require("fs");
const { atualizarAcoes, atualizarReplicas } = require("./utils");

const file_path = "./precos.txt";

function read_file() {
  return fs.readFileSync(file_path, "utf-8");
}

let atualizacao = 0;
const x = 3;

const server = http.createServer((req, res) => {
  if (req.url === "/precos") {
    atualizacao++;
    console.log("Atualização: " + atualizacao);

    atualizarAcoes();

    if (atualizacao >= x) {
      atualizacao = 0;
      atualizarReplicas();
    }

    const preco_data = read_file();
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

    res.end(preco_data);
  } else {
    console.log(req.url);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
