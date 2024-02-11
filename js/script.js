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
  /* Refactored to accept multiple elements to apply 'show' animation. May eventually make class name dynamic also.*/
  function handleScrollAnimations(...selector) {
    console.log(...selector);
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Calculate delay based on card's position in the NodeList
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Stop observing the card once it's shown
          }
        });
      },
      {
        threshold: 0.75, // Adjust as needed
      }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      observer.observe(element);
    });
  }

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

  function handleLandingPageAnimations() {
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
    handleLandingPageAnimations();
    handleScrollAnimations('.card');
  }

  // ADD EVENT LISTENERS HERE!
  document.addEventListener('DOMContentLoaded', mainApp);
})();
