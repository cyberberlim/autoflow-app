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
      card.className = "flex justify-between items-center bg-darkcard p-4 rounded-xl border border-white/5 hover:border-autoflow/30 transition-all";
      card.innerHTML = `
        <div>
          <h3 class="font-semibold text-sm">${a.nome}</h3>
          <p class="text-xs text-gray-400">${a.servico}</p>
          <p class="text-xs text-gray-500">${a.data} - ${a.hora}</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="px-2 py-1 rounded-full text-xs ${statusClass}">${a.status}</span>
          <button class="btn-editar">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706l-1.793 1.793-2.647-2.647L12.855.999a.5.5 0 0 1 .707 0l1.94 1.94z"/>
<path d="M1 13.5V16h2.5l7.373-7.373-2.5-2.5L1 13.5z"/>
</svg>
</button>
          <button class="btn-excluir">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
<path d="M5.5 5.5v7M10.5 5.5v7"/>
<path d="M14 3H2"/>
<path d="M6 3V2h4v1"/>
<path d="M4.5 3h7l-.5 11h-6z"/>
</svg>
</button>
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
  document.getElementById("confirm-delete").onclick = function() {

  if(deleteIndex !== null){

    agendamentos.splice(deleteIndex,1);

    salvar();
    renderizar();

    deleteIndex = null;

    document.getElementById("delete-modal").classList.add("hidden");
    
  });

  cancelDeleteBtn.addEventListener("click", () => {
    deleteIndex = null;
    deleteModal.classList.add("hidden");
  });

  renderizar();
});
