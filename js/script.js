// Tombol "ke atas": muncul setelah halaman di-scroll
var toTop = document.querySelector('.to-top');

if (toTop) {
  window.addEventListener('scroll', function () {
    toTop.classList.toggle('show', window.scrollY > 400);
  });

  // Langsung menuju ke atas saat kursor diarahkan ke tombol (tanpa klik).
  // Jeda 200 ms agar tidak terpicu kalau kursor hanya lewat sekilas.
  var hoverTimer;
  toTop.addEventListener('mouseenter', function () {
    hoverTimer = setTimeout(function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  });
  toTop.addEventListener('mouseleave', function () {
    clearTimeout(hoverTimer);
  });
}

// Tandai menu yang sedang dibuka secara otomatis
(function () {
  var cur = location.pathname.split('/').pop() || 'index.html';
  if (cur.indexOf('proyek-') === 0) cur = 'proyek.html';   // halaman detail proyek
  document.querySelectorAll('#menu .nav-link').forEach(function (a) {
    var on = a.getAttribute('href') === cur;
    a.classList.toggle('active', on);
    if (on) { a.setAttribute('aria-current', 'page'); }
    else { a.removeAttribute('aria-current'); }
  });
})();

// ===== Mode gelap / terang =====
(function () {
  var root = document.documentElement;

  // Pilihan tersimpan > pengaturan perangkat > terang
  var tema = null;
  try { tema = localStorage.getItem('tema'); } catch (e) {}
  if (!tema) {
    tema = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', tema);

  // Sisipkan tombol di dalam menu (di sebelah kanan)
  var shell = document.querySelector('.nav-shell');
  if (!shell) return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'theme-toggle ms-auto';
  btn.setAttribute('aria-label', 'Ganti mode gelap atau terang');
  btn.title = 'Ganti mode gelap / terang';
  btn.innerHTML =
    '<svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
    '<svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="5"/>' +
    '<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>' +
    '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
    '<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>' +
    '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  var toggler = shell.querySelector('.navbar-toggler');
  if (toggler) {
    toggler.classList.remove('ms-auto');
    toggler.classList.add('ms-2');
    shell.insertBefore(btn, toggler);
  } else {
    shell.appendChild(btn);
  }

  btn.setAttribute('aria-pressed', root.getAttribute('data-theme') === 'dark');
  btn.addEventListener('click', function () {
    var baru = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', baru);
    btn.setAttribute('aria-pressed', baru === 'dark');
    try { localStorage.setItem('tema', baru); } catch (e) {}
  });
})();
