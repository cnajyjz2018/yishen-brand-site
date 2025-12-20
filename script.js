/* =========================================================
   YiShen Global – Core Script
   System Version: 2026.1 (Integrated & Frozen)
   Purpose: Spring-Action Navigation / UI Stability / UX Safety
   ========================================================= */

/**
 * 核心交互：弹簧式伸缩菜单
 * 放在全局作用域，确保 HTML 中的 onclick 属性可直接调用
 */
function toggleSpringMenu(id) {
    const el = document.getElementById(id);
    if (!el) return;

    // 状态判定：判定当前菜单是否已展开
    const isExpanded = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';
    
    // 弹簧物理逻辑：展开目标，同时互斥关闭其他同级内容
    if (!isExpanded) {
        // 先重置所有同类菜单，避免在手机端由于菜单过长无法滑到底部的 Bug
        document.querySelectorAll('.accordion-content').forEach(menu => {
            menu.style.maxHeight = '0px';
        });
        
        // 动态计算内容高度实现弹簧顺滑伸展
        el.style.maxHeight = el.scrollHeight + "px";
    } else {
        // 物理收缩
        el.style.maxHeight = "0px";
    }
}

/**
 * 手机端子菜单增强：处理嵌套展开高度计算
 */
function toggleSubMenu(id) {
    const el = document.getElementById(id);
    const parent = document.getElementById('mobile-drawer'); // 对应您的移动端侧边栏 ID
    if (!el) return;

    const isExpanded = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';
    el.style.maxHeight = isExpanded ? '0px' : el.scrollHeight + "px";

    // 补丁：如果子菜单展开，强制父容器高度设为 auto，防止内容截断
    if (parent && !isExpanded) {
        setTimeout(() => {
            parent.style.maxHeight = 'none';
        }, 10);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    /* ---------------------------------------------------------
       1. NAVBAR TOGGLE (Mobile Safe - 传统汉堡菜单)
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
       2. CLICK OUTSIDE TO CLOSE (交互补丁：吸取顶级商务站体验)
       --------------------------------------------------------- */
    document.addEventListener("click", (e) => {
        // 如果点击的是导航区域以外的地方，自动关闭所有打开的弹簧菜单
        if (!e.target.closest('#master-nav') && !e.target.closest('.accordion-content')) {
            document.querySelectorAll('.accordion-content').forEach(menu => {
                menu.style.maxHeight = '0px';
            });
        }
    });

    /* ---------------------------------------------------------
       3. NAVBAR ACTIVE STATE (页面高亮逻辑)
       --------------------------------------------------------- */
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname.replace(/\/$/, "");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href")?.replace(/\/$/, "");
        if (linkPath && currentPath.endsWith(linkPath)) {
            link.classList.add("active");
        }
    });

    /* ---------------------------------------------------------
       4. PREVENT RAGE CLICK (防抖动保护)
       --------------------------------------------------------- */
    document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("click", () => {
            el.classList.add("clicked");
            setTimeout(() => el.classList.remove("clicked"), 600);
        });
    });

    /* ---------------------------------------------------------
       5. IMAGE LOAD GUARD (防止布局闪烁)
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
       6. SECTION REVEAL (吸取 MillerKnoll 极简动效感)
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
        }, { threshold: 0.1 });

        revealItems.forEach(item => observer.observe(item));
    }

    /* ---------------------------------------------------------
       7. LOGGING & DEBUG (主权检测)
       --------------------------------------------------------- */
    const navbars = document.querySelectorAll("nav");
    if (navbars.length > 1) {
        console.warn("[YiShen Warning] Multiple navbars detected. Ensure structure follows architectural map.");
    }
});
