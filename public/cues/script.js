const nav = document.getElementById('main-nav');
const menu = document.querySelector('.menu-button');
const form = document.getElementById('cue-form');

document.getElementById('year').textContent = new Date().getFullYear();

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menu.setAttribute('aria-expanded', String(open));
  menu.querySelector('span').textContent = open ? '—' : '+';
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.querySelector('span').textContent = '+';
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const edition = document.getElementById('edition').value;
  const note = document.getElementById('note').value.trim() || 'No notes provided yet.';
  const subject = encodeURIComponent(`Calitoy C7 First Edition — ${name}`);
  const body = encodeURIComponent(`CALITOY C7 FIRST-EDITION LIST\n\nName: ${name}\nEmail: ${email}\nEdition interest: ${edition}\n\nNote:\n${note}`);
  document.getElementById('notice').innerHTML = `Your first-edition request is ready. <a href="mailto:joseph@xcalitoy.com?subject=${subject}&body=${body}">SEND IT TO CALITOY CUES →</a>`;
});
