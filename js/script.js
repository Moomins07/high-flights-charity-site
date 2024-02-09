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

// IIFE to keep everything nice and neat outside of the global scope :)
(() => {
  function handleNavBarLinks() {
    document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
      link.addEventListener('click', function () {
        // Remove active class from all nav links
        document
          .querySelectorAll('.navbar-nav .nav-link')
          .forEach((navLink) => {
            navLink.classList.remove('active');
          });

        // Add active class to the clicked nav link
        this.classList.add('active');
      });
    });
  }

  function handleAnimations() {
    const introLogo = document.getElementById('intro-logo');
    const path = window.location.pathname;

    if (path === 'index.html' || '/') {
      setTimeout(() => {
        introLogo.classList.add('animate__fadeIn');
      }, 0);
      setTimeout(() => {
        introLogo.classList.add('animate__fadeOutShrinkMove');
      }, 1500);
    }
  }

  function mainApp() {
    handleNavBarLinks();
    handleAnimations();
  }

  // ADD EVENT LISTENERS HERE!
  document.addEventListener('DOMContentLoaded', mainApp);
})();
