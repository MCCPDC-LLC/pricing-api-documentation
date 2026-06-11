/* ============================================================
   API Docs — shared interactions
   ============================================================ */

/* Copy-to-clipboard buttons */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Highlight active sidebar link on scroll ── */
  const sections = document.querySelectorAll('.doc-section[id]');
  const sidebarLinks = document.querySelectorAll('.sidebar nav a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-60px 0px -70% 0px' }
  );

  sections.forEach(s => observer.observe(s));

  /* ── Copy buttons ── */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block').querySelector('pre');
      const text = pre.innerText || pre.textContent;
      navigator.clipboard.writeText(text.trim()).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  /* ── Active nav link ── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active',
      href === path ||
      (path === '' && href === 'index.html') ||
      (path === 'index.html' && href === 'index.html')
    );
  });
});
