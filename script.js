/* =========================================================
   YiShen Global – Core Script
   System Version: 2026 (Frozen)
   Purpose: Navigation / UI Stability / Interaction Safety
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------------------------------
     1. NAVBAR TOGGLE (Mobile Safe)
     --------------------------------------------------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu   = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("open");
    });
  }


  /* ---------------------------------------------------------
     2. NAVBAR ACTIVE STATE (Current Page Highlight)
     --------------------------------------------------------- */
  const navLinks = document.querySelectorAll(".nav-menu a");
  const currentPath = window.location.pathname.replace(/\/$/, "");

  navLinks.forEach(link => {
    const linkPath = link.getAttribute("href")?.replace(/\/$/, "");
    if (linkPath && currentPath.endsWith(linkPath)) {
      link.classList.add("active");
    }
  });


  /* ---------------------------------------------------------
     3. PREVENT DOUBLE CLICK / RAGE CLICK (UX Safety)
     --------------------------------------------------------- */
  document.querySelectorAll("a").forEach(anchor => {
    anchor.addEventListener("click", () => {
      anchor.classList.add("clicked");
      setTimeout(() => anchor.classList.remove("clicked"), 600);
    });
  });


  /* ---------------------------------------------------------
     4. IMAGE LOAD GUARD (Prevent Layout Jump)
     --------------------------------------------------------- */
  const images = document.querySelectorAll("img");
  images.forEach(img => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
    img.addEventListener("error", () => {
      img.style.display = "none";
    });
  });


  /* ---------------------------------------------------------
     5. SECTION FADE-IN (Lightweight, Not Marketing)
     --------------------------------------------------------- */
  const revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealItems.forEach(item => observer.observe(item));
  }


  /* ---------------------------------------------------------
     6. SAFETY LOCK – DO NOT ALLOW MULTIPLE NAVBARS
     --------------------------------------------------------- */
  const navbars = document.querySelectorAll(".navbar");
  if (navbars.length > 1) {
    console.warn(
      "[YiShen Warning] Multiple navbars detected. Keep only components/navbar.html"
    );
  }

});
