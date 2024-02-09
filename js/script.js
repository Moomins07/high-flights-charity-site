// HAMBURGER MENU

// const btn = document.getElementById('menu-btn');
// const menu = document.getElementById('menu');

// btn.addEventListener('click', navToggle);

// // Toggle Mobile Menu
// function navToggle() {
//   btn.classList.toggle('open');
//   menu.classList.toggle('flex');
//   menu.classList.toggle('hidden');
// }

function mainApp() {
  // NAVBAR HANDLE ACTIVE LINK
  document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    link.addEventListener('click', function () {
      // Remove active class from all nav links
      document.querySelectorAll('.navbar-nav .nav-link').forEach((navLink) => {
        navLink.classList.remove('active');
      });

      // Add active class to the clicked nav link
      this.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', mainApp);
