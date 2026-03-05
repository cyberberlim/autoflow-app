document.addEventListener("DOMContentLoaded", function () {

  const btnNovo = document.getElementById("btn-new-agendamento");
  const container = document.getElementById("agendamentos-container");
  const emptyState = document.getElementById("empty-state");

  let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  function salvar() {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }

  function renderizar() {
    container.innerHTML = "";

    if (agendamentos.length === 0) {
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    agendamentos.forEach((a, index) => {
      const card = document.createElement("div");
      card.className = "glass-card rounded-2xl p-5 text-white";
      card.innerHTML = `
        <h3 class="font-bold mb-2">${a.nome}</h3>
        <p class="text-sm text-gray-400">${a.data} - ${a.hora}</p>
        <button data-index="${index}" class="mt-3 text-red-400 text-sm btn-delete">Excluir</button>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", function () {
        const i = this.getAttribute("data-index");
        agendamentos.splice(i, 1);
        salvar();
        renderizar();
      });
    });
  }

  btnNovo?.addEventListener("click", function () {
    const nome = prompt("Nome do cliente:");
    const data = prompt("Data (AAAA-MM-DD):");
    const hora = prompt("Hora (HH:MM):");

    if (!nome || !data || !hora) return;

    agendamentos.push({ nome, data, hora });
    salvar();
    renderizar();
  });

  renderizar();
});
