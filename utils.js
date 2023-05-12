const fs = require("fs");
const http = require("http");

const file_path = "./precos.txt";

const host_replica_1 = "localhost";
const host_replica_2 = "localhost";

function atualizarAcoes() {
  const novaAcao = `Ação ${Math.floor(Math.random() * 100)} = ${Math.floor(
    Math.random() * 100
  )}`;

  fs.appendFileSync(file_path, `\n${novaAcao}`);

  console.log("Ações atualizadas");
}

function atualizarReplicas() {
  // fs.copyFileSync(file_path, "./replica01/precos.txt");
  // fs.copyFileSync(file_path, "./replica02/precos.txt");

  const preco_data = fs.readFileSync(file_path, "utf-8");

  http
    .request(
      {
        host: host_replica_1,
        port: 3001,
        path: "/atualizarPrecos",
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
      },
      (res) => {
        res.on("data", (chunk) => {
          // console.log(`BODY: ${chunk}`);
        });
      }
    )
    .end(preco_data);

  http
    .request(
      {
        host: host_replica_2,
        port: 3002,
        path: "/atualizarPrecos",
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
      },
      (res) => {
        res.on("data", (chunk) => {
          // console.log(`BODY: ${chunk}`);
        });
      }
    )
    .end(preco_data);
}

module.exports = {
  atualizarAcoes,
  atualizarReplicas,
};
