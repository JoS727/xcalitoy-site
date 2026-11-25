/* ============================================================
   CALITOY Agency — shared footer for all satellite sites
   One company. Injects the unified footer: branding, family
   links, contact. Text-only identity (C + rotated-V A).
   Usage: <script src="/agency/calitoy-agency.js"></script>
   ============================================================ */
(function () {
  var HOST_BRAND = {
    'calitoy.org': 'Calitoy Cues', 'cues.calitoy.com': 'Calitoy Cues',
    'brushedpast.com': 'Brushed Past', 'calitoymuse.com': 'Calitoy Muse',
    'calitoywares.com': 'Calitoy Wares', 'girlnextup.com': 'Girl Next Up',
    'josephcalitoy.com': 'Joseph Calitoy', 'openedterminal.com': 'Opened Terminal',
    'risentoday.com': 'Risen Today', 'spoofdaily.com': 'Spoof Daily',
    'calitoycore.com': 'Calitoy CORE'
  };
  var TUNNEL = {
    'josephcalitoy.com': 'josephcalitoy', 'calitoy.org': 'calitoycues', 'cues.calitoy.com': 'calitoycues',
    'calitoymuse.com': 'calitoymuse', 'calitoywares.com': 'calitoywares', 'openedterminal.com': 'openedterminal',
    'brushedpast.com': 'brushedpast', 'girlnextup.com': 'girlnextup', 'risentoday.com': 'risentoday',
    'spoofdaily.com': 'spoofdaily'
  };
  var host = window.location.hostname.replace(/^www\./, '');
  var brand = HOST_BRAND[host] || document.title.split(/[—|–-]/)[0].trim() || host;
  var isArtist = host === 'josephcalitoy.com';
  var tunnel = TUNNEL[host];

  function rotA(word) {
    // Render "CALITOY" with the A as a 180°-rotated V
    var i = word.toUpperCase().indexOf('A');
    if (i < 0) return word;
    return word.slice(0, i) +
      '<span style="display:inline-block;transform:rotate(180deg);">' + word[i] + '</span>' +
      word.slice(i + 1);
  }

  var css = document.createElement('style');
  css.textContent = [
    '.cya-footer{margin-top:4rem;background:#050505;border-top:1px solid #1f1f1f;color:#8a8a8a;',
    'font-family:Arial,Helvetica,sans-serif;text-align:center;padding:2.2rem 1.2rem 2.6rem;}',
    '.cya-footer a{color:inherit;text-decoration:none;}',
    '.cya-footer a:hover{color:#e8e8e8;}',
    '.cya-mark{font-weight:900;letter-spacing:.08em;color:#f0f0f0;font-size:1.15rem;}',
    '.cya-mark .cya-a{display:inline-block;transform:rotate(180deg);}',
    '.cya-agency{font-size:.72rem;letter-spacing:.28em;color:#6d6d6d;margin-top:.35rem;text-transform:uppercase;}',
    '.cya-links{display:flex;gap:1.4rem;justify-content:center;flex-wrap:wrap;margin-top:1.1rem;font-size:.82rem;}',
    '.cya-contact{margin-top:1rem;font-size:.82rem;color:#9a9a9a;}',
    '.cya-legal{margin-top:1.4rem;font-size:.68rem;color:#555;}'
  ].join('');
  document.head.appendChild(css);

  var footer = document.createElement('footer');
  footer.className = 'cya-footer';
  footer.innerHTML =
    '<div class="cya-mark">C<span class="cya-a">A</span>LITOY</div>' +
    '<div class="cya-agency">' + (isArtist ? 'Artist Lane &middot; CALITOY Agency' : 'A CALITOY Agency Company') + '</div>' +
    '<div class="cya-links">' +
      '<a href="https://calitoy.com">Company</a>' +
      '<a href="https://calitoycore.com">CORE Platform</a>' +
      '<a href="https://josephcalitoy.com">Artist Calitoy</a>' +
      (host === 'calitoy.org' || host === 'cues.calitoy.com' ? '' : '<a href="https://calitoy.org">Cues</a>') +
      '<a href="https://openedterminal.com">Opened Terminal</a>' +
      '<a href="https://brushedpast.com">Brushed Past</a>' +
    '</div>' +
    (tunnel ? '<div class="cya-contact" style="margin-top:.9rem"><a href="https://calitoycore.com/tunnel/' + tunnel +
      '.html" style="color:#f59e0b;font-weight:700">Enter CORE through ' + brand + ' →</a></div>' : '') +
    '<div class="cya-contact">Contact: <a href="mailto:joseph@xcalitoy.com?subject=' +
      encodeURIComponent(brand) + '%20Inquiry">joseph@xcalitoy.com</a></div>' +
    '<div class="cya-legal">&copy; ' + new Date().getFullYear() + ' CALITOY Agency &middot; ' + brand +
      ' &middot; Media &bull; Fashion &bull; Tech</div>';
  (document.body || document.documentElement).appendChild(footer);
})();