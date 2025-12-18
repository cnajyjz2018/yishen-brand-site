async function loadComponent(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  const res = await fetch(url);
  el.innerHTML = await res.text();
}

loadComponent("site-navbar", "/components/navbar.html");
loadComponent("site-footer", "/components/footer.html");
