const http = require("http");
const fs = require("fs");
const readline = require("readline");

const file_path = "./resultados";

function save_file(data, prefix) {
  const date = new Date();
  const hourMinuteSecond = date.toLocaleTimeString("pt-BR").replace(/:/g, "-");

  if (!fs.existsSync(file_path)) {
    fs.mkdirSync(file_path, { recursive: false });
  }
  fs.writeFileSync(`${file_path}/${prefix}-${hourMinuteSecond}.txt`, data);
}

function getPrecos(port) {
  http
    .get(`http://localhost:${port}/precos`, (res) => {
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
  "Escolha o servidor/réplica:  (0 = Servidor), (1, 2 = Réplicas)",
  (answer) => {
    switch (answer) {
      case "0":
        getPrecos(3000);
        break;
      case "1":
        getPrecos(3001);
        break;
      case "2":
        getPrecos(3002);
        break;
      default:
        console.log("Opção inválida");
        break;
    }
    rl.close();
  }
);

// getPrecos(3000);

// setTimeout(() => {
//   getPrecos(3001);
// }, 2000);

// setTimeout(() => {
//   getPrecos(3002);
// }, 4000);
