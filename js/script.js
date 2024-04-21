// IIFE to keep everything nice and neat outside of the global scope :)
(() => {
  // HAMBURGER MENU

  // Toggle Mobile Menu
  function navToggle() {
    const btn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');

    setTimeout(() => {
      btn.classList.toggle('disabled');
    }, 500);
    // btn.classList
    btn.classList.toggle('disabled');
    btn.classList.toggle('open');
  }

  /* Refactored to apply animations to multiple elements. I went deep down this rabbit hole. */

  function handleScrollAnimations(...args) {
    let className = typeof args[0] === 'string' ? args.shift() : undefined;
    let onIntersectCallback =
      typeof args[0] === 'function' ? args.shift() : undefined;
    let selectors = args; // Remaining arguments are treated as selectors

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only add the class if className is a non-empty string
            if (className) {
              entry.target.classList.add(className);
            }

            if (onIntersectCallback) {
              onIntersectCallback(entry.target, observer);
            }

            // Optionally, stop observing the target if no longer needed
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        observer.observe(element);
      });
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
    console.log('mainApp is being called');
    checkForWindowChange();
    handleNavBarLinks();
    handleLandingPageAnimations();
    handleScrollAnimations('show', '.homepg-card');
    /* Honestly I'm not sure I even know what's going on here anymore but it works. Using IntersectionObserverAPI and a callback function in my handleScrollAnimations function to check for the last-card being observed, to use the callback to then call handleScrollAnimations to apply the animations .5s after eachother using setTimeout...? */
    handleScrollAnimations((target, observer) => {
      if (target.classList.contains('last-card')) {
        setTimeout(() => {
          handleScrollAnimations('animate__rotateClockwise90', '.card-step-1');
        }, 500);
        setTimeout(() => {
          handleScrollAnimations(
            'animate__rotateCounterClockwise90',
            '.card-step-2'
          );
        }, 1000);
      }
    }, '.card-container');
  }

  function checkForWindowChange() {
    const cardOne = document.querySelector('.card-step-1');
    const cardTwo = document.querySelector('.card-step-2');

    // Only apply class changes if the elements exist
    if (cardOne && cardTwo) {
      if (window.innerWidth > 1350) {
        cardOne.classList.remove('no-after');
        cardTwo.classList.remove('no-after');
      } else {
        cardOne.classList.add('no-after');
        cardTwo.classList.add('no-after');
      }
    }
  }

  // ADD EVENT LISTENERS HERE!
  document.getElementById('menu-btn').addEventListener('click', navToggle);
  window.addEventListener('resize', checkForWindowChange);
  document.addEventListener('DOMContentLoaded', mainApp);
})();
