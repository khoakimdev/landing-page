document.addEventListener('DOMContentLoaded', () => {
  // 1. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Target all elements with animation classes
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-card, .section-title-animate');
  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Smooth Scrolling for Anchor Links & CTA buttons
  document.querySelectorAll('a[href^="#"], button[data-scroll]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      const targetId = trigger.getAttribute('href') || trigger.getAttribute('data-scroll');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 3. Floating Back To Top Button
  const backToTopBtn = document.querySelector('.button-back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 4. Form Interactive Handler
  const trialForm = document.querySelector('.form');
  if (trialForm) {
    const submitBtn = trialForm.querySelector('.button-2');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Quick visual feedback
        submitBtn.style.transform = 'scale(0.96)';
        setTimeout(() => {
          submitBtn.style.transform = '';
        }, 150);

        // Show feedback toast
        showToast('Cảm ơn bạn đã đăng ký! Khoa Kim sẽ liên hệ tư vấn trong 15 phút.');
      });
    }
  }

  // Helper toast notification
  function showToast(message) {
    let existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="toast-content">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('active'), 10);
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
});
