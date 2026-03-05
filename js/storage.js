const Storage = {
  salvar(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
  },

  carregar(chave) {
    return JSON.parse(localStorage.getItem(chave)) || [];
  },

  adicionar(chave, item) {
    const lista = this.carregar(chave);
    lista.push(item);
    this.salvar(chave, lista);
  },

  deletar(chave, index) {
    const lista = this.carregar(chave);
    lista.splice(index, 1);
    this.salvar(chave, lista);
  },

  atualizar(chave, index, item) {
    const lista = this.carregar(chave);
    lista[index] = item;
    this.salvar(chave, lista);
  }
};                      }
