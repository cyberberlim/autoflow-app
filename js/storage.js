// storage.js

// Inicializa storage com backup no localStorage
const storage = {
  agendamentos: JSON.parse(localStorage.getItem("agendamentos")) || [],
  clientes: JSON.parse(localStorage.getItem("clientes")) || [],
  financeiro: JSON.parse(localStorage.getItem("financeiro")) || [],
  configuracoes: JSON.parse(localStorage.getItem("configuracoes")) || {}
};

// Salva dados no storage centralizado e localStorage
function salvarStorage(chave, valor) {
  storage[chave] = valor;
  localStorage.setItem(chave, JSON.stringify(valor));
}

// Carrega dados do storage
function carregarStorage(chave) {
  return storage[chave] || [];
}

// Adiciona item a um array do storage
function adicionarItem(chave, item) {
  if (!storage[chave]) storage[chave] = [];
  storage[chave].push(item);
  salvarStorage(chave, storage[chave]);
}

// Remove item por índice
function removerItem(chave, index) {
  if (!storage[chave]) return;
  storage[chave].splice(index, 1);
  salvarStorage(chave, storage[chave]);
}

// Função de backup opcional (salvar JSON em nuvem)
async function backupOnline(url) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storage)
    });
    if (!response.ok) throw new Error("Falha ao enviar backup");
    console.log("Backup enviado com sucesso!");
  } catch (err) {
    console.error("Erro no backup:", err);
  }
      }
