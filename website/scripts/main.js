/**
 * The Creative Conservator - Main JavaScript
 * ==========================================
 * Core functionality for the website including navigation,
 * smooth scrolling, accordion toggles, and form handling.
 */

(function() {
  'use strict';

  /**
   * DOM Ready Handler
   * Ensures all DOM content is loaded before executing scripts
   */
  function domReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  /**
   * Mobile Menu Toggle
   * Handles opening and closing of the mobile navigation menu
   */
  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    const mobileLinks = document.querySelectorAll('.nav-mobile .nav-link');
    const body = document.body;

    if (!menuToggle || !mobileNav) return;

    // Toggle menu on button click
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileNav.classList.contains('open');

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking a link
    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
      }
    });

    function openMenu() {
      menuToggle.classList.add('active');
      mobileNav.classList.add('open');
      body.style.overflow = 'hidden';
      menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      menuToggle.classList.remove('active');
      mobileNav.classList.remove('open');
      body.style.overflow = '';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  /**
   * Smooth Scroll for Anchor Links
   * Provides smooth scrolling behavior for internal anchor links
   */
  function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const headerOffset = 80; // Account for fixed header

    anchorLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        // Skip if it's just "#" or empty
        if (targetId === '#' || targetId === '') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();

          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update URL without triggering scroll
          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      });
    });
  }

  /**
   * Accordion Toggle
   * Handles expanding and collapsing of accordion items
   */
  function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(function(header) {
      header.addEventListener('click', function() {
        const accordionItem = this.parentElement;
        const accordionContent = accordionItem.querySelector('.accordion-content');
        const isActive = accordionItem.classList.contains('active');
        const accordion = accordionItem.closest('.accordion');

        // Check if accordion should allow multiple open items
        const allowMultiple = accordion && accordion.hasAttribute('data-allow-multiple');

        // Close other items if not allowing multiple
        if (!allowMultiple && accordion) {
          const allItems = accordion.querySelectorAll('.accordion-item');
          allItems.forEach(function(item) {
            if (item !== accordionItem && item.classList.contains('active')) {
              item.classList.remove('active');
              const content = item.querySelector('.accordion-content');
              if (content) {
                content.style.maxHeight = null;
              }
              item.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            }
          });
        }

        // Toggle current item
        if (isActive) {
          accordionItem.classList.remove('active');
          accordionContent.style.maxHeight = null;
          this.setAttribute('aria-expanded', 'false');
        } else {
          accordionItem.classList.add('active');
          accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
          this.setAttribute('aria-expanded', 'true');
        }
      });

      // Set initial ARIA attributes
      header.setAttribute('aria-expanded', 'false');
    });
  }

  /**
   * Form Handling
   * Basic form submission handler with validation and success message
   */
  function initFormHandling() {
    const forms = document.querySelectorAll('form[data-ajax]');

    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous error states
        clearFormErrors(form);

        // Validate form
        const isValid = validateForm(form);

        if (!isValid) {
          return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : '';

        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
        }

        // Simulate form submission (replace with actual AJAX in production)
        setTimeout(function() {
          // Reset button state
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }

          // Show success message
          showSuccessMessage(form);

          // Reset form
          form.reset();
        }, 1500);
      });
    });

    // Real-time validation on blur
    const formInputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    formInputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        validateField(this);
      });

      // Clear error on input
      input.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
          clearFieldError(this);
        }
      });
    });
  }

  /**
   * Form Validation Helper Functions
   */
  function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(function(field) {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';

    // Check if required and empty
    if (field.hasAttribute('required') && value === '') {
      isValid = false;
      errorMessage = 'This field is required';
    }
    // Email validation
    else if (type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    // Phone validation (basic)
    else if (type === 'tel' && value !== '') {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }

    if (!isValid) {
      showFieldError(field, errorMessage);
    }

    return isValid;
  }

  function showFieldError(field, message) {
    field.classList.add('is-invalid');

    // Remove existing error message if any
    const existingError = field.parentNode.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
  }

  function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  function clearFormErrors(form) {
    const invalidFields = form.querySelectorAll('.is-invalid');
    const errorMessages = form.querySelectorAll('.form-error');

    invalidFields.forEach(function(field) {
      field.classList.remove('is-invalid');
    });

    errorMessages.forEach(function(error) {
      error.remove();
    });
  }

  function showSuccessMessage(form) {
    // Remove existing success message if any
    const existingSuccess = form.querySelector('.form-success');
    if (existingSuccess) {
      existingSuccess.remove();
    }

    // Create and insert success message
    const successElement = document.createElement('div');
    successElement.className = 'form-success';
    successElement.innerHTML = '<strong>Thank you!</strong> Your message has been sent successfully. We\'ll get back to you soon.';

    form.insertBefore(successElement, form.firstChild);

    // Scroll to success message
    successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Remove success message after 5 seconds
    setTimeout(function() {
      successElement.style.opacity = '0';
      successElement.style.transition = 'opacity 0.3s ease';
      setTimeout(function() {
        successElement.remove();
      }, 300);
    }, 5000);
  }

  /**
   * Header Scroll Effect
   * Adds 'scrolled' class to header when page is scrolled
   */
  function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (!header) return;

    const scrollThreshold = 50;
    let lastScroll = 0;
    let ticking = false;

    function updateHeader() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      // Add/remove scrolled class based on scroll position
      if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Optional: Hide header on scroll down, show on scroll up
      // Uncomment the following if you want this behavior:
      /*
      if (currentScroll > lastScroll && currentScroll > 200) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      */

      lastScroll = currentScroll;
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });

    // Check initial scroll position
    updateHeader();
  }

  /**
   * Active Navigation Link
   * Highlights the current section's navigation link while scrolling
   */
  function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    function updateActiveLink() {
      const scrollPosition = window.scrollY + 100;

      sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', function() {
      window.requestAnimationFrame(updateActiveLink);
    });
  }

  /**
   * Lazy Loading Images
   * Simple lazy loading for images with data-src attribute
   */
  function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });

      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(function(img) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  /**
   * Initialize All Functions
   */
  domReady(function() {
    initMobileMenu();
    initSmoothScroll();
    initAccordion();
    initFormHandling();
    initHeaderScroll();
    initActiveNavigation();
    initLazyLoading();

    // Log initialization complete (remove in production)
    console.log('The Creative Conservator: Scripts initialized');
  });

})();
