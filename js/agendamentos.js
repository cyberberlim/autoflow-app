document.addEventListener("DOMContentLoaded", function () {

  const btnNovo = document.getElementById("new-appointment-btn");
  const modal = document.getElementById("modal");
  const form = document.getElementById("appointment-form");
  const container = document.getElementById("appointments-list");
  const emptyState = document.getElementById("empty-state");

  const deleteModal = document.getElementById("delete-modal");
  const confirmDeleteBtn = document.getElementById("confirm-delete");
  const cancelDeleteBtn = document.getElementById("cancel-delete");

  let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
  let deleteIndex = null;

  function salvar() {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }

  function renderizar() {
    container.innerHTML = "";

    if (agendamentos.length === 0) {
      emptyState.style.display = "block";
      document.getElementById("total-appointments").textContent = 0;
      document.getElementById("pending-count").textContent = 0;
      document.getElementById("confirmed-count").textContent = 0;
      document.getElementById("completed-count").textContent = 0;
      return;
    }

    emptyState.style.display = "none";

    document.getElementById("total-appointments").textContent = agendamentos.length;
    document.getElementById("pending-count").textContent =
      agendamentos.filter(a => a.status.toLowerCase() === "pendente").length;
    document.getElementById("confirmed-count").textContent =
      agendamentos.filter(a => a.status.toLowerCase() === "confirmado").length;
    document.getElementById("completed-count").textContent =
      agendamentos.filter(a => a.status.toLowerCase() === "concluido").length;

    agendamentos.forEach((a, index) => {
      let statusClass = "";
      if (a.status.toLowerCase() === "pendente") statusClass = "status-pendente";
      if (a.status.toLowerCase() === "confirmado") statusClass = "status-confirmado";
      if (a.status.toLowerCase() === "concluido") statusClass = "status-concluido";

      const card = document.createElement("div");
      card.className = "appointment-card flex justify-between items-center text-white max-w-md mx-auto p-4 rounded-2xl border border-white/10";

      card.innerHTML = `
        <div>
          <h3 class="font-semibold text-sm">${a.nome}</h3>
          <p class="text-xs text-gray-400">${a.servico}</p>
          <p class="text-xs text-gray-500">${a.data} - ${a.hora}</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="px-2 py-1 rounded-full text-xs ${statusClass}">${a.status}</span>
          <button data-index="${index}" class="btn-edit text-cyan-400 hover:text-cyan-300 transition-colors" title="Editar">✏</button>
          <button data-index="${index}" class="btn-delete text-red-400 hover:text-red-300 transition-colors" title="Excluir">🗑</button>
        </div>
      `;

      container.appendChild(card);
    });

    // Botões de excluir
    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", function () {
        deleteIndex = this.getAttribute("data-index");
        deleteModal.classList.remove("hidden"); // mostra o modal de confirmação
      });
    });

    // Botões de editar (apenas exemplo simples, você pode expandir)
    document.querySelectorAll(".btn-edit").forEach(btn => {
      btn.addEventListener("click", function () {
        const i = this.getAttribute("data-index");
        const ag = agendamentos[i];
        document.getElementById("client-name").value = ag.nome;
        document.getElementById("service").value = ag.servico;
        document.getElementById("date").value = ag.data;
        document.getElementById("time").value = ag.hora;
        document.getElementById("status").value = ag.status;
        modal.classList.remove("hidden");

        // Remove o agendamento antigo ao salvar novamente
        agendamentos.splice(i, 1);
      });
    });
  }

  // Novo agendamento
  btnNovo.addEventListener("click", function () {
    modal.classList.remove("hidden");
  });

  // Formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("client-name").value;
    const servico = document.getElementById("service").value;
    const data = document.getElementById("date").value;
    const hora = document.getElementById("time").value;
    const status = document.getElementById("status").value;

    agendamentos.push({ nome, servico, data, hora, status });
    salvar();
    renderizar();

    form.reset();
    modal.classList.add("hidden");
  });

  // Fechar modal
  window.closeModal = function () {
    modal.classList.add("hidden");
  };

  // Modal de exclusão
  confirmDeleteBtn.addEventListener("click", () => {
    if (deleteIndex !== null) {
      agendamentos.splice(deleteIndex, 1);
      salvar();
      renderizar();
      deleteIndex = null;
    }
    deleteModal.classList.add("hidden");
  });

  cancelDeleteBtn.addEventListener("click", () => {
    deleteIndex = null;
    deleteModal.classList.add("hidden");
  });

  renderizar();
});
