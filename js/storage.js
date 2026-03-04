// storage.js
const Storage = {
  salvar: (chave, dados) => localStorage.setItem(chave, JSON.stringify(dados)),
  carregar: (chave) => JSON.parse(localStorage.getItem(chave)) || [],
  limpar: (chave) => localStorage.removeItem(chave),
};

const dados = {
  agendamentos: Storage.carregar("agendamentos"),
  caixa: Storage.carregar("caixa"),
  estoque: Storage.carregar("estoque"),
  produtos: Storage.carregar("produtos"),
  relatorios: Storage.carregar("relatorios"),
  configuracoes: Storage.carregar("configuracoes"),
};

function adicionar(chave, item) {
  if (!dados[chave]) dados[chave] = [];
  dados[chave].push(item);
  Storage.salvar(chave, dados[chave]);
}

function deletar(chave, index) {
  if (!dados[chave]) return;
  dados[chave].splice(index, 1);
  Storage.salvar(chave, dados[chave]);
}

function atualizar(chave, index, item) {
  if (!dados[chave]) return;
  dados[chave][index] = item;
  Storage.salvar(chave, dados[chave]);
}

function getDados(chave) {
  return dados[chave] || [];
                      }
