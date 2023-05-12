const http = require("http");
const fs = require("fs");
const readline = require("readline");

const file_path = "./resultados";

// const host_replica_1 = "172.20.10.11";
const host_replica_1 = "localhost";
const host_replica_2 = "localhost";

function save_file(data, prefix) {
  const date = new Date();
  const hourMinuteSecond = date.toLocaleTimeString("pt-BR").replace(/:/g, "-");

  if (!fs.existsSync(file_path)) {
    fs.mkdirSync(file_path, { recursive: false });
  }
  fs.writeFileSync(`${file_path}/${prefix}-${hourMinuteSecond}.txt`, data);
}

function getPrecos(host, port) {
  http
    .get(`http://${host}:${port}/precos`, (res) => {
      let preco_data = "";

      res.on("data", (chunk) => {
        preco_data += chunk;
      });

      res.on("end", () => {
        save_file(preco_data, port);
        console.log(`Preços salvos - ${port}`);
      });
    })
    .on("error", (err) => {
      console.error(`Erro na requisição: ${err.message}`);
    });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Escolha o servidor/réplica(s) - (0 = Servidor), (1, 2 = Réplicas): ",
  (answer) => {
    switch (answer) {
      case "0":
        getPrecos("localhost", 3000);
        break;
      case "1":
        getPrecos(host_replica_1, 3001);
        break;
      case "2":
        getPrecos(host_replica_2, 3002);
        break;
      default:
        console.log("Opção inválida");
        break;
    }
    rl.close();
  }
);
