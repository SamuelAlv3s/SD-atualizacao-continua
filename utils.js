const fs = require("fs");
const file_path_count = "./atualizacoes.json";
const file_path = "./precos.txt";
const file_path_replica01 = "./replica01/precos.txt";

function updateAcoes() {
  const novaAcao = `Ação ${Math.floor(Math.random() * 100)} = ${Math.floor(
    Math.random() * 100
  )}`;

  fs.appendFileSync(file_path, `\n${novaAcao}`);
  fs.copyFileSync(file_path, file_path_replica01);

  console.log("Ações atualizadas");
}

function getAtualizacao() {
  const atualizacoesFile = fs.readFileSync(file_path_count, "utf-8");
  const count = JSON.parse(atualizacoesFile).count;
  return count;
}

function incrementarAtualizacao() {
  const countAtual = getAtualizacao();
  const count = countAtual + 1;
  const data = { count };
  fs.writeFileSync(file_path_count, JSON.stringify(data, null, 2));
}

function zerarAtualizacao() {
  const count = 0;
  const data = { count };
  fs.writeFileSync(file_path_count, JSON.stringify(data, null, 2));
}

function atualizarReplicas() {
  zerarAtualizacao();
  fs.copyFileSync(file_path, "./replica01/precos.txt");
  fs.copyFileSync(file_path, "./replica02/precos.txt");
}

module.exports = {
  updateAcoes,
  getAtualizacao,
  incrementarAtualizacao,
  atualizarReplicas,
};
