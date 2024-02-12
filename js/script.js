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
  /* Refactored to apply animations to multiple elements. I went deep down this rabbit hole. */

  function handleScrollAnimations(className, ...args) {
    // Determine if the second argument is a callback function or a selector
    let onIntersectCallback = null;
    let selectors;

    // When passing null into function, it was adding 'null' as a class.
    // if (className === null) {
    //   className = '';
    // }

    if (typeof args[0] === 'function') {
      onIntersectCallback = args[0];
      selectors = args.slice(1);
    } else {
      selectors = args;
    }
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);

            BUG; // NEED TO REMOVE 'null' FROM CLASS LIST
            if (className) {
              entry.target.classList.add(className);
            }

            if (onIntersectCallback) {
              onIntersectCallback(entry.target, observer);
            }
            observer.unobserve(entry.target); // Stop observing the card once it's shown
          }
        });
      },
      {
        threshold: 0.5, // Adjust as needed
      }
    );

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
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
    handleNavBarLinks();
    handleLandingPageAnimations();
    handleScrollAnimations('show', '.card');
    /* Honestly I'm not sure I even know what's going on here anymore but it works. Using IntersectionObserverAPI and a callback function in my handleScrollAnimations function to check for the last-card being observed, to use the callback to then call handleScrollAnimations to apply the animations .5s after eachother using setTimeout...?   */
    handleScrollAnimations(
      null,
      (target, observer) => {
        if (target.classList.contains('last-card')) {
          setTimeout(() => {
            handleScrollAnimations(
              'animate__rotateClockwise90',
              '.card-step-1'
            );
          }, 500);
          setTimeout(() => {
            handleScrollAnimations(
              'animate__rotateClockwise90',
              '.card-step-2'
            );
          }, 1000);
        }
      },
      '.card-container'
    );

    // ADD EVENT LISTENERS HERE!
  }
  document.addEventListener('DOMContentLoaded', mainApp);
})();
