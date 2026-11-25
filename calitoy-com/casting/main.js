/* Calitoy Casting - JS */
(function() {
  'use strict';

  // Mobile nav toggle
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
      });
    });
  }

  // Stripe checkout handler
  window.calitoyCheckout = function(priceId, productName) {
    fetch('https://email-capture.calitoy.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'checkout',
        priceId: priceId,
        productName: productName,
        metadata: { company: 'calitoy-casting' }
      })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout error. Please try again.');
      }
    })
    .catch(function() {
      alert('Network error. Please try again.');
    });
  };

  // Intake form handler
  var intakeForm = document.getElementById('intake-form');
  if (intakeForm) {
    intakeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var msgDiv = document.getElementById('form-message');
      var submitBtn = document.getElementById('intake-submit');
      
      var data = {
        email: document.getElementById('email').value,
        source: 'calitoy-casting-intake',
        name: document.getElementById('name').value,
        production_name: document.getElementById('production_name').value,
        role_type: document.getElementById('role_type').value,
        budget: document.getElementById('budget').value,
        message: document.getElementById('message').value
      };

      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      msgDiv.className = 'form-message';
      msgDiv.style.display = 'none';

      fetch('https://email-capture.calitoy.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(function(res) { return res.json(); })
      .then(function(result) {
        msgDiv.className = 'form-message success';
        msgDiv.textContent = 'Your casting brief has been submitted. Our team will contact you within 24 hours.';
        msgDiv.style.display = 'block';
        intakeForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Casting Brief';
      })
      .catch(function() {
        msgDiv.className = 'form-message error';
        msgDiv.textContent = 'There was an error submitting your brief. Please try again or email us directly.';
        msgDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Casting Brief';
      });
    });
  }
})();
