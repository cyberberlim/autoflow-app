document.addEventListener("DOMContentLoaded", function () {
  const btnNovo = document.getElementById("new-appointment-btn");
  const modal = document.getElementById("modal");
  const form = document.getElementById("appointment-form");
  const container = document.getElementById("appointments-list");
  const emptyState = document.getElementById("empty-state");
  const deleteModal = document.getElementById("delete-modal");
  const confirmDeleteBtn = document.getElementById("confirm-delete-btn");

  let agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
  let indexToDelete = null;
  let indexToEdit = null;

  function salvar() {
    localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  }

  function renderizar() {
    container.innerHTML = "";

    if (agendamentos.length === 0) {
      emptyState.style.display = "block";
      updateCounters();
      return;
    }

    emptyState.style.display = "none";
    updateCounters();

    agendamentos.forEach((a, index) => {
      let statusClass = "";
      if (a.status === "pendente") statusClass = "bg-yellow-500/20 text-yellow-400";
      if (a.status === "confirmado") statusClass = "bg-blue-500/20 text-blue-400";
      if (a.status === "concluido") statusClass = "bg-green-500/20 text-green-400";

      const card = document.createElement("div");
card.className = "appointment-card flex justify-between items-center text-white w-full max-w-sm p-3 rounded-xl border border-white/10 mb-2 shadow-sm";
card.innerHTML = `
  <div class="flex flex-col gap-1">
    <h3 class="font-semibold text-sm truncate">${a.nome}</h3>
    <p class="text-xs text-gray-400 truncate">${a.servico}</p>
    <p class="text-xs text-gray-500">${a.data} - ${a.hora}</p>
  </div>
  <div class="flex items-center gap-2">
    <span class="px-2 py-0.5 rounded-full text-[10px] ${statusClass}">${a.status}</span>
    <button data-index="${index}" class="btn-edit text-cyan-400 hover:text-cyan-300 transition-colors">
      ✏
    </button>
    <button data-index="${index}" class="btn-delete text-red-400 hover:text-red-300 transition-colors">
      🗑
    </button>
  </div>
`;
        </div>
      `;
      container.appendChild(card);
    });

    // Edit buttons
    document.querySelectorAll(".btn-edit").forEach(btn => {
      btn.addEventListener("click", function () {
        indexToEdit = this.getAttribute("data-index");
        const a = agendamentos[indexToEdit];
        document.getElementById("client-name").value = a.nome;
        document.getElementById("service").value = a.servico;
        document.getElementById("date").value = a.data;
        document.getElementById("time").value = a.hora;
        document.getElementById("status").value = a.status;
        modal.classList.remove("hidden");
      });
    });

    // Delete buttons
    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", function () {
        indexToDelete = this.getAttribute("data-index");
        deleteModal.classList.remove("hidden");
      });
    });
  }

  function updateCounters() {
    document.getElementById("total-appointments").textContent = agendamentos.length;
    document.getElementById("pending-count").textContent = agendamentos.filter(a => a.status === "pendente").length;
    document.getElementById("confirmed-count").textContent = agendamentos.filter(a => a.status === "confirmado").length;
    document.getElementById("completed-count").textContent = agendamentos.filter(a => a.status === "concluido").length;
  }

  btnNovo.addEventListener("click", function () {
    indexToEdit = null;
    form.reset();
    modal.classList.remove("hidden");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("client-name").value;
    const servico = document.getElementById("service").value;
    const data = document.getElementById("date").value;
    const hora = document.getElementById("time").value;
    const status = document.getElementById("status").value;

    if (indexToEdit !== null) {
      agendamentos[indexToEdit] = { nome, servico, data, hora, status };
    } else {
      agendamentos.push({ nome, servico, data, hora, status });
    }

    salvar();
    renderizar();
    modal.classList.add("hidden");
    form.reset();
  });

  // Close modals
  window.closeModal = () => modal.classList.add("hidden");
  window.closeDeleteModal = () => deleteModal.classList.add("hidden");

  confirmDeleteBtn.addEventListener("click", () => {
    if (indexToDelete !== null) {
      agendamentos.splice(indexToDelete, 1);
      salvar();
      renderizar();
      deleteModal.classList.add("hidden");
      indexToDelete = null;
    }
  });

  renderizar();
});
