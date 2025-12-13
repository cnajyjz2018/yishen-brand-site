// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // FAQ toggle (works on any page with .faq-item)
  document.querySelectorAll(".faq-item h3").forEach((heading) => {
    heading.addEventListener("click", () => {
      const p = heading.nextElementSibling;
      if (!p) return;
      const visible = p.style.display === "block";
      // close all
      document.querySelectorAll(".faq-item p").forEach((el) => {
        el.style.display = "none";
      });
      p.style.display = visible ? "none" : "block";
    });
  });
});
