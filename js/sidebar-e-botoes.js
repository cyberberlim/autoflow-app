// Atualiza o sidebar para mostrar o item ativo
const sidebarLinks = document.querySelectorAll('.sidebar-item');
const currentPage = location.pathname.split("/").pop(); 

sidebarLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// Converte todos os atributos onclick em listeners de evento
document.querySelectorAll('button, [onclick]').forEach(btn => {
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

console.log("Scripts de sidebar e botões carregados!");
