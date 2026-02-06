import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Lenis instance
let lenis: Lenis | null = null;

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Initialize Lenis smooth scrolling
 */
function initLenis(): void {
  if (prefersReducedMotion) return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  // Connect Lenis to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
}

/**
 * Initialize scroll reveal animations
 */
function initScrollReveals(): void {
  if (prefersReducedMotion) {
    // Remove initial states for reduced motion
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('revealed');
    });
    return;
  }

  // Fade up reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => el.classList.add('revealed'),
        },
      }
    );
  });

  // Fade left reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal="fade-left"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => el.classList.add('revealed'),
        },
      }
    );
  });

  // Fade right reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal="fade-right"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => el.classList.add('revealed'),
        },
      }
    );
  });

  // Stagger up reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal="stagger-up"]').forEach((parent) => {
    const children = parent.children;
    gsap.fromTo(
      children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 85%',
          once: true,
          onEnter: () => parent.classList.add('revealed'),
        },
      }
    );
  });

  // Clip up reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal="clip-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => el.classList.add('revealed'),
        },
      }
    );
  });

  // Scale in reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal="scale-in"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => el.classList.add('revealed'),
        },
      }
    );
  });

  // Split lines reveal (simple version without text splitting library)
  gsap.utils.toArray<HTMLElement>('[data-reveal="split-lines"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => el.classList.add('revealed'),
        },
      }
    );
  });
}

/**
 * Initialize parallax effects
 */
function initParallax(): void {
  if (prefersReducedMotion) return;

  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || '-15');

    gsap.to(el, {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/**
 * Initialize custom cursor
 */
function initCustomCursor(): void {
  const cursor = document.getElementById('custom-cursor');
  if (!cursor || prefersReducedMotion) return;

  // Check if device has hover capability (not touch-only)
  if (!window.matchMedia('(hover: hover)').matches) {
    cursor.style.display = 'none';
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animate cursor position with lag
  gsap.ticker.add(() => {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    gsap.set(cursor, { x: cursorX, y: cursorY });
  });

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, [data-cursor-hover]');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    target.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
}

/**
 * Initialize scroll progress bar
 */
function initScrollProgress(): void {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });
}

/**
 * Initialize header scroll effect
 */
function initHeaderScroll(): void {
  const header = document.getElementById('header');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      if (self.direction === -1 || self.progress === 0) {
        header.classList.remove('is-scrolled');
      } else {
        header.classList.add('is-scrolled');
      }
    },
  });

  // Also check scroll position on load
  if (window.scrollY > 80) {
    header.classList.add('is-scrolled');
  }
}

/**
 * Initialize magnetic tilt effect on cards
 */
function initMagneticTilt(): void {
  if (prefersReducedMotion) return;

  gsap.utils.toArray<HTMLElement>('[data-magnetic-tilt]').forEach((el) => {
    const maxRotation = 3; // degrees

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -maxRotation;
      const rotateY = ((x - centerX) / centerX) * maxRotation;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  });
}

/**
 * Initialize page transitions
 */
function initPageTransitions(): void {
  if (prefersReducedMotion) return;

  const transitionOverlay = document.getElementById('page-transition');
  if (!transitionOverlay) return;

  // Handle link clicks for page transitions
  document.querySelectorAll('a[data-transition-link]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      // Check if it's an external link
      if (href.startsWith('http') && !href.includes(window.location.hostname)) {
        return;
      }

      e.preventDefault();

      // Animate out
      transitionOverlay.classList.add('is-entering');

      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });

  // On page load, animate the overlay away
  window.addEventListener('pageshow', () => {
    if (transitionOverlay.classList.contains('is-entering')) {
      transitionOverlay.classList.remove('is-entering');
      transitionOverlay.classList.add('is-leaving');

      setTimeout(() => {
        transitionOverlay.classList.remove('is-leaving');
      }, 400);
    }
  });
}

/**
 * Initialize process timeline line animation
 */
function initProcessLine(): void {
  const line = document.querySelector('[data-process-line]');
  if (!line || prefersReducedMotion) return;

  gsap.to(line, {
    width: '100%',
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: line.parentElement,
      start: 'top 70%',
      once: true,
    },
  });
}

/**
 * Main initialization function
 */
export function initAnimations(): void {
  // Initialize Lenis first
  initLenis();

  // Initialize all animation modules
  initScrollReveals();
  initParallax();
  initCustomCursor();
  initScrollProgress();
  initHeaderScroll();
  initMagneticTilt();
  initPageTransitions();
  initProcessLine();

  // Refresh ScrollTrigger after all content is loaded
  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}

// Export individual functions for selective use
export {
  initLenis,
  initScrollReveals,
  initParallax,
  initCustomCursor,
  initScrollProgress,
  initHeaderScroll,
  initMagneticTilt,
  initPageTransitions,
  initProcessLine,
};
