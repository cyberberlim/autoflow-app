// =========================
// OBJETO DE DADOS (será atualizado pelo SDK)
// =========================
const dados = {
  receitaTotal: 0,
  custoTotal: 0,
  lucroTotal: 0,
  margem: 0,
  totalAgendamentos: 0,
  pendentes: 0,
  confirmados: 0,
  concluidos: 0
};

// =========================
// FUNÇÃO PARA ATUALIZAR OS CARDS NA TELA
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
// FUNÇÃO PARA CARREGAR DADOS DO SDK
// =========================
async function carregarDados() {
  try {
    // Substitua esses métodos pelos do seu SDK real
    const receitaTotal = await DataSDK.getReceitaTotal(); 
    const custoTotal = await DataSDK.getCustoTotal();
    const lucroTotal = receitaTotal - custoTotal;
    const margem = receitaTotal > 0 ? ((lucroTotal / receitaTotal) * 100).toFixed(1) : 0;

    const totalAgendamentos = await DataSDK.getTotalAgendamentos();
    const pendentes = await DataSDK.getAgendamentosPorStatus('pendente');
    const confirmados = await DataSDK.getAgendamentosPorStatus('confirmado');
    const concluidos = await DataSDK.getAgendamentosPorStatus('concluido');

    // Atualiza o objeto dados
    dados.receitaTotal = receitaTotal;
    dados.custoTotal = custoTotal;
    dados.lucroTotal = lucroTotal;
    dados.margem = margem;

    dados.totalAgendamentos = totalAgendamentos;
    dados.pendentes = pendentes;
    dados.confirmados = confirmados;
    dados.concluidos = concluidos;

    // Atualiza os cards na tela
    atualizarCards();
  } catch (error) {
    console.error("Erro ao carregar dados do SDK:", error);
  }
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
  carregarDados(); // Busca os dados do SDK e atualiza a tela
});
