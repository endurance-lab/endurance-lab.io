const hero = document.getElementById('hero');
const logo = document.getElementById('logo');
const arrow = document.getElementById('arrow');
const triangles = document.getElementById('triangles');
const triBeige = document.getElementById('tri-beige');
const triBlue = document.getElementById('tri-blue');
const triPink = document.getElementById('tri-pink');

const isMobile = window.matchMedia('(pointer: coarse)').matches;
const logoR = logo.offsetWidth / 2;

const MOBILE_REST = {
  x: window.innerWidth * 0.6 - logoR,
  y: window.innerHeight * 0.2 - logoR,
};

/* ──────────── Хелпер треугольников ─────────── */
function updateTriangles(cx, cy) {
  const w = window.innerWidth,
    h = window.innerHeight;
  triBeige.setAttribute('points', `${cx},${cy} 0,0 0,${h}`);
  triBlue.setAttribute('points', `${cx},${cy} 0,0 ${w},0`);
  triPink.setAttribute('points', `${cx},${cy} ${w},0 ${w},${h}`);
}

/* ──────────── Начальная позиция ─────────── */
gsap.set(logo, {
  x: isMobile ? MOBILE_REST.x : window.innerWidth / 2 - logoR,
  y: isMobile ? MOBILE_REST.y : window.innerHeight / 2 - logoR,
  scale: 2,
  transformOrigin: '50% 50%',
});

updateTriangles((isMobile ? MOBILE_REST.x : window.innerWidth / 2) + logoR, (isMobile ? MOBILE_REST.y : window.innerHeight / 2) + logoR);
/* ──────────── Плавное следование за курсором ─────────── */
const FOLLOW_DUR = 1.2;
let isPinned = false;
let currentPinnedSection = null;

function followPointer(e) {
  if (isPinned) return;
  const targetX = e.clientX - logoR;
  const targetY = e.clientY - logoR;
  gsap.to(logo, {
    x: targetX,
    y: targetY,
    duration: FOLLOW_DUR,
    ease: 'power2.out',
    overwrite: 'auto',
    onUpdate: () => {
      const r = logo.getBoundingClientRect();
      updateTriangles(r.left + r.width * 0.5, r.top + r.height * 0.5);
    },
  });
}
if (!isMobile) {
  window.addEventListener('pointermove', followPointer);
}

/* ──────────── Ресайз ─────────── */
window.addEventListener('resize', () => {
  const r = logo.getBoundingClientRect();
  updateTriangles(r.left + r.width * 0.5, r.top + r.height * 0.5);
});

function updateCenter() {
  const r = logo.getBoundingClientRect();
  updateTriangles(r.left + r.width * 0.5, r.top + r.height * 0.5);
}

function toggleHeroAssets() {
  const heroRect = hero.getBoundingClientRect();
  const pct = Math.min(Math.max(-heroRect.top / heroRect.height, 0), 1);
  const shrink = pct >= 0.1;
  gsap.to(logo, { scale: shrink ? 0.8 : 2.2, duration: 0.2, ease: 'power1.inOut', overwrite: 'auto', onUpdate: updateCenter });
  gsap.to(arrow, { opacity: shrink ? 0 : 1, duration: 0.2, ease: 'power1.inOut', overwrite: 'auto' });
}
toggleHeroAssets();
document.addEventListener('scroll', toggleHeroAssets, { passive: true });

/* ──────────── Логика «прилипания» ─────────── */
const pinSections = Array.from(document.querySelectorAll('section')).filter((s) => s.id && s.id.startsWith('section'));

function updatePinPosition() {
  if (!isPinned || !currentPinnedSection) return;
  const heading = currentPinnedSection.querySelector('h2');
  if (!heading) return;
  const rect = heading.getBoundingClientRect();

  let targetX, targetY;

  if (isMobile) {
    targetX = rect.left;
    targetY = rect.top - logoR * 2 - 16;
  } else {
    targetX = rect.left - logoR * 2 - 16;
    targetY = rect.top + rect.height / 2 - logoR;
  }

  // const targetX = rect.left - 16 - logoR * 2;
  // const targetY = rect.top + rect.height / 2 - logoR;
  gsap.to(logo, { x: targetX, y: targetY, duration: 0.2, ease: 'power1.inOut', overwrite: 'auto', onUpdate: updateCenter });
}

function handlePinScroll() {
  let nextSection = null;
  for (let i = 0; i < pinSections.length - 1; i++) {
    const rect = pinSections[i].getBoundingClientRect();
    const progress = -rect.top / rect.height;
    if (progress >= 0.5) {
      nextSection = pinSections[i + 1];
    }
  }

  if (nextSection !== currentPinnedSection) {
    if (nextSection) {
      isPinned = true;
      currentPinnedSection = nextSection;
      updatePinPosition();
    } else {
      isPinned = false;
      currentPinnedSection = null;

      if (isMobile) {
        gsap.to(logo, {
          x: MOBILE_REST.x,
          y: MOBILE_REST.y,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate: updateCenter,
        });
      }
    }
  }

  if (isPinned) updatePinPosition();
}
document.addEventListener('scroll', handlePinScroll, { passive: true });
