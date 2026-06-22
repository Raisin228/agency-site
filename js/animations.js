// Services accordion
document.querySelectorAll('.service__header').forEach(header => {
  header.addEventListener('click', () => {
    const service = header.parentElement;
    const isActive = service.classList.contains('active');
    document.querySelectorAll('.service').forEach(s => s.classList.remove('active'));
    if (!isActive) service.classList.add('active');
  });
});

// Burger menu
(function () {
  const burger = document.querySelector('.nav__burger');
  const mobile = document.getElementById('nav-mobile');
  if (!burger || !mobile) return;
  burger.addEventListener('click', () => mobile.classList.toggle('open'));
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobile.classList.remove('open'));
  });
})();
