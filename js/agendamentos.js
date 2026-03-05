document.addEventListener("DOMContentLoaded", function () {

  const btnNovo = document.getElementById("new-appointment-btn");
  const modal = document.getElementById("modal");
  const form = document.getElementById("appointment-form");
  const container = document.getElementById("appointments-list");
  const emptyState = document.getElementById("empty-state");

  let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];

  function salvar() {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }

  function renderizar() {
    container.innerHTML = "";

    if (agendamentos.length === 0) {
      emptyState.style.display = "block";
      return;
    }

    emptyState.style.display = "none";

    agendamentos.forEach((a, index) => {
      const card = document.createElement("div");
      card.className = "appointment-card text-white";

      card.innerHTML = `
        <h3 class="font-semibold">${a.nome}</h3>
        <p class="text-sm text-gray-400">${a.servico}</p>
        <p class="text-sm text-gray-500">${a.data} - ${a.hora}</p>
        <button data-index="${index}" class="mt-2 text-red-400 text-sm btn-delete">Excluir</button>
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

  btnNovo.addEventListener("click", function () {
    modal.classList.remove("hidden");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("client-name").value;
    const servico = document.getElementById("service").value;
    const data = document.getElementById("date").value;
    const hora = document.getElementById("time").value;

    agendamentos.push({ nome, servico, data, hora });

    salvar();
    renderizar();

    form.reset();
    modal.classList.add("hidden");
  });

  window.closeModal = function () {
    modal.classList.add("hidden");
  };

  renderizar();
});
