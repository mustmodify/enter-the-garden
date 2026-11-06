(function () {
  var dlg = document.getElementById('lb');
  if (!dlg || !dlg.showModal) return;
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  var img = dlg.querySelector('img');
  var cap = dlg.querySelector('figcaption');
  var at = 0;

  function show(i) {
    at = (i + shots.length) % shots.length;
    var a = shots[at];
    var chapter = a.closest('.chapter').querySelector('h2').textContent;
    img.src = a.href;
    img.width = a.dataset.w;
    img.height = a.dataset.h;
    img.alt = a.querySelector('img').alt;
    cap.textContent = chapter + ' · ' + (at + 1) + ' / ' + shots.length;
    var next = shots[(at + 1) % shots.length];
    new Image().src = next.href;
  }

  shots.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      show(i);
      dlg.showModal();
    });
  });

  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.querySelector('.lb-prev').addEventListener('click', function () { show(at - 1); });
  dlg.querySelector('.lb-next').addEventListener('click', function () { show(at + 1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(at - 1);
    else if (e.key === 'ArrowRight') show(at + 1);
  });

  var x0 = null;
  dlg.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(at + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });
})();
