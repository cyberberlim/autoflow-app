// Navegação ativa
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function() {
    document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// Logout simples
document.querySelector(".logout-btn")?.addEventListener("click", function() {
  window.location.href = "index.html";
});
