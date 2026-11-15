// Shows the newest release (version, date, sizes) from GitHub's API. The download
// buttons work without it: they point at /releases/latest/download/<file>.
(async () => {
  const el = document.getElementById('release');
  const repo = document.documentElement.dataset.repo;
  if (!el || !repo || repo.startsWith('__')) return;
  try {
    const r = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
    if (!r.ok) return;
    const rel = await r.json();
    const hr = document.documentElement.lang === 'hr';
    const date = new Date(rel.published_at).toLocaleDateString(hr ? 'hr-HR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    el.textContent = (hr ? 'Najnovije izdanje: ' : 'Latest release: ') + `${rel.name || rel.tag_name} · ${date}`;
    for (const a of rel.assets || []) {
      const span = document.querySelector(`[data-size="${a.name}"]`);
      if (span) span.textContent = `${(a.size / 1048576).toFixed(0)} MB`;
    }
  } catch (_) {
    // Offline or rate-limited: the page works without it.
  }
})();
