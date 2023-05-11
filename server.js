const http = require("http");
const fs = require("fs");
const {
  updateAcoes,
  incrementarAtualizacao,
  getAtualizacao,
  atualizarReplicas,
} = require("./utils");

const file_path = "./precos.txt";

function read_file() {
  return fs.readFileSync(file_path, "utf-8");
}

const server = http.createServer((req, res) => {
  if (req.url === "/precos") {
    incrementarAtualizacao();
    const atualizacao = getAtualizacao();
    console.log("Atualização: " + atualizacao);

    if (atualizacao >= 2) {
      updateAcoes();
    }

    if (atualizacao >= 3) {
      atualizarReplicas();
    }

    const preco_data = read_file();
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

    res.end(preco_data);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
