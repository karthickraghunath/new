// main.js - Navigation and Scroll Functionality
// Implements smooth scrolling, hamburger menu toggle, and active section highlighting

// === Constants ===
const BREAKPOINT = 768;
const SCROLL_DURATION = 400;
const SECTIONS = [
  { id: 'home', element: document.getElementById('home') },
  { id: 'flowers', element: document.getElementById('flowers') },
  { id: 'why-choose', element: document.getElementById('why-choose') },
  { id: 'export-info', element: document.getElementById('export-info') },
  { id: 'contact', element: document.getElementById('contact') },
];

// === Image Error Handling for Flower Cards ===
function setupFlowerCardImageHandling() {
  const flowerCards = document.querySelectorAll('.flower-card');
  
  flowerCards.forEach(card => {
    const img = card.querySelector('img');
    const varietyName = card.dataset.variety;
    
    if (img && varietyName) {
      img.addEventListener('error', () => {
        // Create fallback container
        const fallbackContainer = document.createElement('div');
        fallbackContainer.className = 'flower-card-fallback';
        fallbackContainer.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          background-color: #f0f0f0;
          color: #666;
          font-size: 1.25rem;
          font-weight: 600;
          padding: var(--spacing-md);
          text-align: center;
          border-radius: 12px;
        `;
        fallbackContainer.textContent = varietyName;
        
        // Replace the failed image with fallback
        img.style.display = 'none';
        card.appendChild(fallbackContainer);
        
        console.warn(`Image failed to load for flower: ${varietyName}. Fallback text displayed.`);
      });
    }
  });
}

// === Smooth Scrolling Implementation ===
function smoothScrollTo(sectionId, duration = SCROLL_DURATION) {
  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // EaseInOutQuad easing function for smooth start and end
    const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    
    window.scrollTo(0, startPosition + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

// === Navigation Link Handlers ===
function setupNavigationLinks() {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        event.preventDefault();
        const sectionId = href.substring(1);
        smoothScrollTo(sectionId);
        
        // Auto-collapse hamburger menu on mobile after link selection
        if (window.innerWidth < BREAKPOINT) {
          toggleHamburgerMenu(false);
        }
      }
    });
  });
}

// === Hamburger Menu Toggle ===
function setupHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  
  if (!hamburger) return;

  hamburger.addEventListener('click', () => {
    toggleHamburgerMenu();
  });

  // Handle window resize - collapse menu if going from mobile to desktop
  let wasMobile = window.innerWidth < BREAKPOINT;
  
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < BREAKPOINT;
    if (wasMobile && !isMobile) {
      // Transitioning from mobile to desktop - ensure menu is collapsed
      toggleHamburgerMenu(false);
    }
    wasMobile = isMobile;
  });
}

function toggleHamburgerMenu(forceState = undefined) {
  const hamburger = document.getElementById('hamburger');
  const navWrapper = document.querySelector('.nav-wrapper');
  
  if (!hamburger || !navWrapper) return;

  const isActive = forceState !== undefined 
    ? forceState 
    : hamburger.classList.contains('active');

  if (isActive) {
    // Collapse menu
    hamburger.classList.remove('active');
    navWrapper.classList.remove('active');
    document.body.classList.remove('no-scroll');
  } else {
    // Expand menu
    hamburger.classList.add('active');
    navWrapper.classList.add('active');
    document.body.classList.add('no-scroll');
  }
}

// === Active Section Highlighting (Scroll Spy) ===
function setupActiveSectionHighlighting() {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if (navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        updateActiveLink(sectionId);
      }
    });
  }, observerOptions);

  // Observe all sections
  SECTIONS.forEach(({ id, element }) => {
    if (element) {
      observer.observe(element);
    }
  });
}

function updateActiveLink(activeSectionId) {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkSectionId = href.substring(1);
    
    if (linkSectionId === activeSectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// === Initialize on DOM Ready ===
function initialize() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
    return;
  }

  // Check if elements exist before setting up
  const navLinksContainer = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  
  if (navLinksContainer) {
    setupNavigationLinks();
  }
  
  if (hamburger) {
    setupHamburgerMenu();
  }
  
  setupActiveSectionHighlighting();
  
  // Set up flower card image error handling
  setupFlowerCardImageHandling();
}

// Start initialization
initialize();
