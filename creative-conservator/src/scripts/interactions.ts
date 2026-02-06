import gsap from 'gsap';

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu(): void {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('nav-mobile');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('is-open');

    if (isOpen) {
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    } else {
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close menu on nav link click
  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.classList.contains('is-open')) {
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Initialize accordion functionality with GSAP animations
 */
function initAccordions(): void {
  const accordions = document.querySelectorAll('[data-accordion]');

  accordions.forEach((accordion) => {
    const allowMultiple = accordion.getAttribute('data-allow-multiple') === 'true';
    const items = accordion.querySelectorAll('[data-accordion-item]');

    items.forEach((item) => {
      const trigger = item.querySelector('[data-accordion-trigger]');
      const content = item.querySelector('[data-accordion-content]') as HTMLElement;

      if (!trigger || !content) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // If not allowing multiple, close other items
        if (!allowMultiple) {
          items.forEach((otherItem) => {
            if (otherItem !== item && otherItem.classList.contains('is-open')) {
              closeAccordionItem(otherItem);
            }
          });
        }

        if (isOpen) {
          closeAccordionItem(item);
        } else {
          openAccordionItem(item);
        }
      });
    });
  });
}

function openAccordionItem(item: Element): void {
  const trigger = item.querySelector('[data-accordion-trigger]');
  const content = item.querySelector('[data-accordion-content]') as HTMLElement;
  const inner = content?.querySelector('.accordion-content-inner') as HTMLElement;

  if (!content || !inner) return;

  item.classList.add('is-open');
  trigger?.setAttribute('aria-expanded', 'true');

  // Get the natural height
  const height = inner.offsetHeight;

  // Animate open with GSAP
  gsap.to(content, {
    height,
    duration: 0.4,
    ease: 'power2.out',
  });
}

function closeAccordionItem(item: Element): void {
  const trigger = item.querySelector('[data-accordion-trigger]');
  const content = item.querySelector('[data-accordion-content]') as HTMLElement;

  if (!content) return;

  item.classList.remove('is-open');
  trigger?.setAttribute('aria-expanded', 'false');

  // Animate closed with GSAP
  gsap.to(content, {
    height: 0,
    duration: 0.3,
    ease: 'power2.in',
  });
}

/**
 * Initialize testimonial carousel
 */
function initTestimonialCarousel(): void {
  const carousels = document.querySelectorAll('[data-testimonial-carousel]');

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll('[data-testimonial-slide]');
    const dots = carousel.querySelectorAll('[data-testimonial-dot]');
    const autoplayInterval = parseInt(carousel.getAttribute('data-autoplay') || '8000', 10);

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoplayTimer: number;

    function goToSlide(index: number): void {
      // Remove active from all
      slides.forEach((slide) => slide.classList.remove('is-active'));
      dots.forEach((dot) => dot.classList.remove('is-active'));

      // Add active to current
      slides[index]?.classList.add('is-active');
      dots[index]?.classList.add('is-active');

      currentIndex = index;
    }

    function nextSlide(): void {
      const next = (currentIndex + 1) % slides.length;
      goToSlide(next);
    }

    function startAutoplay(): void {
      autoplayTimer = window.setInterval(nextSlide, autoplayInterval);
    }

    function stopAutoplay(): void {
      clearInterval(autoplayTimer);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoplay();
        goToSlide(index);
        startAutoplay();
      });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Start autoplay
    startAutoplay();
  });
}

/**
 * Initialize form handling
 */
function initForms(): void {
  // Contact form
  const contactForms = document.querySelectorAll('[data-contact-form]');
  contactForms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });

  // Newsletter form
  const newsletterForms = document.querySelectorAll('[data-newsletter-form]');
  newsletterForms.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

async function handleFormSubmit(e: Event): Promise<void> {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
  const successMessage = form.querySelector('[data-form-success]');

  if (!submitBtn) return;

  // Disable button and show loading state
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Simulate form submission (replace with actual API call)
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message
    if (successMessage) {
      successMessage.classList.add('is-visible');
      form.reset();

      // Hide form fields optionally
      const formFields = form.querySelectorAll('.form-group');
      formFields.forEach((field) => {
        (field as HTMLElement).style.display = 'none';
      });
      submitBtn.style.display = 'none';
    }
  } catch (error) {
    console.error('Form submission error:', error);
    submitBtn.textContent = 'Error - Try Again';
  } finally {
    submitBtn.disabled = false;
    if (!successMessage?.classList.contains('is-visible')) {
      submitBtn.textContent = originalText;
    }
  }
}

/**
 * Initialize portfolio filter
 */
function initPortfolioFilter(): void {
  const filterBar = document.querySelector('[data-portfolio-filter]');
  const grid = document.querySelector('[data-portfolio-grid]');

  if (!filterBar || !grid) return;

  const buttons = filterBar.querySelectorAll('[data-filter]');
  const cards = grid.querySelectorAll('[data-category]');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active button
      buttons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      // Filter cards with animation
      cards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            onStart: () => {
              (card as HTMLElement).style.display = '';
            },
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              (card as HTMLElement).style.display = 'none';
            },
          });
        }
      });
    });
  });
}

/**
 * Initialize smooth scroll for anchor links
 */
function initSmoothScroll(): void {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

/**
 * Main initialization function
 */
export function initInteractions(): void {
  initMobileMenu();
  initAccordions();
  initTestimonialCarousel();
  initForms();
  initPortfolioFilter();
  initSmoothScroll();
}

// Export individual functions for selective use
export {
  initMobileMenu,
  initAccordions,
  initTestimonialCarousel,
  initForms,
  initPortfolioFilter,
  initSmoothScroll,
};
