/**
 * YiShen Global Website Runtime Include Engine
 * Version: 2026
 * Purpose:
 * - Auto inject navbar & footer
 * - Make static HTML behave like a real website
 */

async function loadComponent(selector, url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    const html = await res.text();
    document.querySelector(selector).innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Inject navbar
  if (document.querySelector("#navbar")) {
    loadComponent("#navbar", "/components/navbar.html");
  }

  // Inject footer
  if (document.querySelector("#footer")) {
    loadComponent("#footer", "/components/footer.html");
  }
});
