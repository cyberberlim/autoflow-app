document.addEventListener("DOMContentLoaded", function () {

  const btnNovo = document.getElementById("btn-new-agendamento");
  const container = document.getElementById("agendamentos-container");
  const emptyState = document.getElementById("empty-state");
  const form = document.getElementById("appointment-form");

  let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  function salvar() {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }

  function renderizar() {
    container.innerHTML = "";

    if (agendamentos.length === 0) {
      emptyState?.classList.remove("hidden");
      return;
    }

    emptyState?.classList.add("hidden");

    agendamentos.forEach((a, index) => {
      const card = document.createElement("div");
      card.className = "glass-card rounded-2xl p-5 text-white";

      card.innerHTML = `
        <h3 class="font-bold mb-2">${a.nome}</h3>
        <p class="text-sm text-gray-400">${a.servico}</p>
        <p class="text-sm text-gray-400">${a.data} - ${a.hora}</p>
        <p class="text-xs mt-2 capitalize">${a.status}</p>
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

  // SALVAR PELO FORMULÁRIO
  form?.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("client-name").value;
    const servico = document.getElementById("service").value;
    const data = document.getElementById("date").value;
    const hora = document.getElementById("time").value;
    const status = document.getElementById("status").value;

    if (!nome || !data || !hora) return;

    agendamentos.push({
      nome,
      servico,
      data,
      hora,
      status
    });

    salvar();
    renderizar();
    form.reset();
  });

  renderizar();
});
