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

  function atualizarContadores() {
    document.getElementById("total-appointments").textContent = agendamentos.length;

    document.getElementById("pending-count").textContent =
      agendamentos.filter(a => a.status === "pendente").length;

    document.getElementById("confirmed-count").textContent =
      agendamentos.filter(a => a.status === "confirmado").length;

    document.getElementById("completed-count").textContent =
      agendamentos.filter(a => a.status === "concluido").length;
  }

  function renderizar() {
    container.innerHTML = "";

    if (agendamentos.length === 0) {
      emptyState.style.display = "block";
      atualizarContadores();
      return;
    }

    emptyState.style.display = "none";

    agendamentos.forEach((a, index) => {

      const card = document.createElement("div");
      card.className =
        "glass-card rounded-xl p-4 text-white text-sm flex justify-between items-center";

      card.innerHTML = `
        <div>
          <h3 class="font-semibold">${a.nome}</h3>
          <p class="text-xs text-gray-400">${a.servico}</p>
          <p class="text-xs text-gray-500">${a.data} - ${a.hora}</p>
          <p class="text-xs mt-1">${a.status}</p>
        </div>

        <div class="flex gap-3">
          <button data-index="${index}" class="btn-edit text-cyan-400 text-sm">✏</button>
          <button data-index="${index}" class="btn-delete text-red-400 text-sm">🗑</button>
        </div>
      `;

      container.appendChild(card);
    });

    // BOTÃO EXCLUIR
    document.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", function () {
        const i = this.getAttribute("data-index");
        agendamentos.splice(i, 1);
        salvar();
        renderizar();
      });
    });

    // BOTÃO EDITAR
    document.querySelectorAll(".btn-edit").forEach(btn => {
      btn.addEventListener("click", function () {
        const i = this.getAttribute("data-index");
        const ag = agendamentos[i];

        document.getElementById("client-name").value = ag.nome;
        document.getElementById("service").value = ag.servico;
        document.getElementById("date").value = ag.data;
        document.getElementById("time").value = ag.hora;
        document.getElementById("status").value = ag.status;

        agendamentos.splice(i, 1);
        salvar();
        renderizar();

        modal.classList.remove("hidden");
      });
    });

    atualizarContadores();
  }

  // ABRIR MODAL
  btnNovo.addEventListener("click", function () {
    modal.classList.remove("hidden");
  });

  // SALVAR FORM
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("client-name").value;
    const servico = document.getElementById("service").value;
    const data = document.getElementById("date").value;
    const hora = document.getElementById("time").value;
    const status = document.getElementById("status").value;

    if (!nome || !servico || !data || !hora || !status) return;

    agendamentos.push({ nome, servico, data, hora, status });

    salvar();
    renderizar();

    form.reset();
    modal.classList.add("hidden");
  });

  // FECHAR MODAL
  window.closeModal = function () {
    modal.classList.add("hidden");
  };

  renderizar();
});
