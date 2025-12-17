/* assets/js/components.js */

async function injectComponent(id, url){
  const el = document.getElementById(id);
  if(!el) return;
  const res = await fetch(url, { cache: "no-store" });
  el.innerHTML = await res.text();
}

function bindNavbarMenu(){
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if(!menuBtn || !navLinks) return;

  const toggle = ()=>navLinks.classList.toggle('active');
  menuBtn.addEventListener('click', toggle);
  menuBtn.addEventListener('keydown', (e)=>{ if(e.key==='Enter') toggle(); });
}

/* ✅ 组件加载后再绑定交互 */
(async ()=>{
  await injectComponent("site-navbar", "components/navbar.html");
  await injectComponent("site-footer", "components/footer.html");
  bindNavbarMenu();

  // ✅ 语言自动初始化（你已有 setLang / LANGS / TEXT 时）
  const saved = localStorage.getItem("lang") || (navigator.language || "en").slice(0,2);
  if(typeof setLang === "function") setLang((window.LANGS && LANGS[saved]) ? saved : "en");
})();
