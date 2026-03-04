// =========================
// DADOS INICIAIS (você pode puxar do SDK depois)
// =========================
const dados = {
  receitaTotal: 12000,
  custoTotal: 5000,
  lucroTotal: 7000,
  margem: 58.3,
  totalAgendamentos: 45,
  pendentes: 10,
  confirmados: 25,
  concluidos: 10
};

// =========================
// FUNÇÃO PARA ATUALIZAR OS CARDS
// =========================
function atualizarCards() {
  document.getElementById('stat-receita-total').textContent = `R$ ${dados.receitaTotal}`;
  document.getElementById('stat-custo-total').textContent = `R$ ${dados.custoTotal}`;
  document.getElementById('stat-lucro-total').textContent = `R$ ${dados.lucroTotal}`;
  document.getElementById('stat-margem').textContent = `${dados.margem}%`;

  document.getElementById('stat-total-agendamentos').textContent = dados.totalAgendamentos;
  document.getElementById('stat-pendentes').textContent = dados.pendentes;
  document.getElementById('stat-confirmados').textContent = dados.confirmados;
  document.getElementById('stat-concluidos').textContent = dados.concluidos;
}

// =========================
// FUNÇÃO GERAR PDF
// =========================
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Relatório Autoflow", 10, 20);

  doc.setFontSize(12);
  doc.text(`Receita Total: R$ ${dados.receitaTotal}`, 10, 40);
  doc.text(`Custo Total: R$ ${dados.custoTotal}`, 10, 50);
  doc.text(`Lucro Líquido: R$ ${dados.lucroTotal}`, 10, 60);
  doc.text(`Margem Líquida: ${dados.margem}%`, 10, 70);

  doc.text(`Total Agendamentos: ${dados.totalAgendamentos}`, 10, 90);
  doc.text(`Pendentes: ${dados.pendentes}`, 10, 100);
  doc.text(`Confirmados: ${dados.confirmados}`, 10, 110);
  doc.text(`Concluídos: ${dados.concluidos}`, 10, 120);

  doc.save("relatorio_autoflow.pdf");
}

// =========================
// FUNÇÃO EXPORTAR CSV
// =========================
function exportarCSV() {
  const linhas = [
    ["Descrição", "Valor"],
    ["Receita Total", dados.receitaTotal],
    ["Custo Total", dados.custoTotal],
    ["Lucro Líquido", dados.lucroTotal],
    ["Margem Líquida (%)", dados.margem],
    ["Total Agendamentos", dados.totalAgendamentos],
    ["Pendentes", dados.pendentes],
    ["Confirmados", dados.confirmados],
    ["Concluídos", dados.concluidos]
  ];

  const csvContent = linhas.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "relatorio_autoflow.csv");
  link.click();
}

// =========================
// INICIALIZAÇÃO AO CARREGAR PÁGINA
// =========================
window.addEventListener("DOMContentLoaded", () => {
  atualizarCards();
});
