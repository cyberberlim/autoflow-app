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
  });

  console.log("Sidebar carregada!");
});
