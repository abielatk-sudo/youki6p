const header = document.querySelector('#header');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.mobile-menu');

const setHeader = () => header.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', setHeader, { passive: true });
setHeader();

menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  document.body.style.overflow = open ? 'hidden' : '';
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}));

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  observer.observe(el);
});

if (!reduced) {
  const experience = document.querySelector('.experience');
  const bottle = document.querySelector('.interactive-bottle');
  const fruits = document.querySelectorAll('.float-fruit');
  addEventListener('scroll', () => {
    const rect = experience.getBoundingClientRect();
    const max = experience.offsetHeight - innerHeight;
    const p = Math.max(0, Math.min(1, -rect.top / max));
    bottle.style.transform = `rotate(${p * 340 - 8}deg) translateY(${Math.sin(p * Math.PI) * -35}px)`;
    fruits.forEach((fruit, i) => fruit.style.transform = `translateY(${-p * (90 + i * 35)}px) rotate(${p * (80 + i * 40)}deg)`);
  }, { passive: true });

  document.querySelectorAll('.flavor-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      if (innerWidth < 900) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('pointerleave', () => card.style.transform = '');
  });
}
