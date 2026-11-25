const price = document.getElementById('build-price');
const form = document.getElementById('board-builder');
const menuButton = document.querySelector('.menu-button');
const nav = document.getElementById('site-nav');

document.getElementById('year').textContent = new Date().getFullYear();

function selectedValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`);
}

function updatePrice() {
  const setupChoice = selectedValue('setup');
  if (setupChoice.dataset.quote === 'true') {
    price.textContent = 'CUSTOM QUOTE';
    return;
  }
  const setup = Number(setupChoice.dataset.price || 0);
  const deck = Number(selectedValue('deck').dataset.price || 0);
  price.textContent = `$${(setup + deck).toLocaleString()}`;
}

document.querySelectorAll('#board-builder input[type="radio"]').forEach((input) => input.addEventListener('change', updatePrice));

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('span').textContent = open ? '—' : '+';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('span').textContent = '+';
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const setup = selectedValue('setup').value;
  const deck = selectedValue('deck').value;
  const wood = selectedValue('wood').value;
  const name = document.getElementById('customer-name').value.trim();
  const email = document.getElementById('customer-email').value.trim();
  const note = document.getElementById('customer-note').value.trim() || 'No additional notes yet.';
  const subject = encodeURIComponent(`Calitoy Customs build brief — ${name}`);
  const body = encodeURIComponent(`CUSTOM BOARD BRIEF\n\nName: ${name}\nEmail: ${email}\nSetup: ${setup}\nDeck: ${deck}\nWood: ${wood}\nBuild total: ${price.textContent}\n\nDirection / notes:\n${note}`);
  document.getElementById('build-notice').innerHTML = `Your brief is ready. <a href="mailto:joseph@tarosyn.com?subject=${subject}&body=${body}">SEND IT TO THE STUDIO →</a>`;
});

updatePrice();
