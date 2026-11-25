// Calitoy Content - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== FAQ ACCORDION =====
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      const item = q.parentElement;
      item.classList.toggle('open');
    });
  });

  // ===== STRIPE CHECKOUT =====
  document.querySelectorAll('[data-stripe-checkout]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var priceId = btn.getAttribute('data-price-id');
      var productName = btn.getAttribute('data-product-name');
      var originalText = btn.textContent;
      btn.textContent = 'Redirecting...';
      btn.disabled = true;

      fetch('https://email-capture.calitoy.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'checkout',
          priceId: priceId,
          productName: productName,
          metadata: { company: 'calitoy-content' }
        })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert('Unable to start checkout. Please try again.');
          btn.textContent = originalText;
          btn.disabled = false;
        }
      })
      .catch(function(err) {
        alert('Connection error. Please try again.');
        btn.textContent = originalText;
        btn.disabled = false;
      });
    });
  });

  // ===== INTAKE FORM =====
  var intakeForm = document.getElementById('intake-form');
  if (intakeForm) {
    intakeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var msgEl = document.getElementById('form-message');
      var submitBtn = intakeForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting...';
      submitBtn.disabled = true;
      msgEl.style.display = 'none';
      msgEl.className = 'form-message';

      var formData = {
        email: document.getElementById('email').value,
        source: 'calitoy-content-intake',
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        budget: document.getElementById('budget').value,
        project_type: document.getElementById('project_type').value,
        message: document.getElementById('message').value
      };

      fetch('https://email-capture.calitoy.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        msgEl.textContent = 'Thank you. Your brief has been received. We will be in touch within 24 hours.';
        msgEl.classList.add('success');
        msgEl.style.display = 'block';
        intakeForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      })
      .catch(function(err) {
        msgEl.textContent = 'Something went wrong. Please email us directly at hello@calitoy.com.';
        msgEl.classList.add('error');
        msgEl.style.display = 'block';
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var targetId = link.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
