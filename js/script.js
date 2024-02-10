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
  function handleCardAnimations() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Calculate delay based on card's position in the NodeList
            const delay = index * 200; // 200ms delay per card
            setTimeout(() => {
              entry.target.classList.add('show');
              observer.unobserve(entry.target); // Stop observing the card once it's shown
            }, delay);
          }
        });
      },
      {
        threshold: 0.1, // Adjust as needed
      }
    );

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      observer.observe(card);
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
    handleCardAnimations();
  }

  // ADD EVENT LISTENERS HERE!
  document.addEventListener('DOMContentLoaded', mainApp);
})();
