// sidebar-e-botoes.js
document.addEventListener("DOMContentLoaded", () => {
  const sidebarLinks = document.querySelectorAll('.sidebar-item');
  const currentPage = location.pathname.split("/").pop(); 

  sidebarLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
      link.style.color = "#00ff88";
    } else {
      link.classList.remove('active');
      link.style.color = "#aaa";
    }

    // Clique no sidebar atualiza visual
    link.addEventListener('click', () => {
      sidebarLinks.forEach(l => {
        l.classList.remove('active');
        l.style.color = "#aaa";
      });
      link.classList.add('active');
      link.style.color = "#00ff88";
    });
  });

  // Converte onclick para addEventListener, mantendo funcionalidade
    const original = btn.getAttribute('onclick');
    if(original && !btn.dataset.listenerAdded) {
      btn.addEventListener('click', function(event){
        event.preventDefault();
        new Function(original).call(this, event);
      });
      btn.dataset.listenerAdded = "true";
      btn.removeAttribute('onclick');
    }
  });

  console.log("Sidebar e botões carregados!");
});
