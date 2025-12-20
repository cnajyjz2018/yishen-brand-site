/* =========================================================
   YiShen Global — Integrated Master Engine 2026
   Version: 2026.FINAL.MASTER (Integrated & Frozen)
   Logic: Navigation Spring-Action, i18n Sync, Intel Matrix Routing
   Patches: Layout Sovereignty (Logo Guard, Anti-Clipping, GPU Glow)
   ========================================================= */

/**
 * 1. 核心交互钩子 (Global Interaction Hooks)
 * 放在全局作用域，确保 HTML 中的 onclick 属性可直接调用
 */

// 弹簧式伸缩菜单逻辑 - 解决手机端由于 SKU 目录过长无法翻页的 Bug
function toggleSpringMenu(id) {
    const el = document.getElementById(id);
    if (!el) return;

    // 状态判定：判定当前菜单是否已展开
    const isExpanded = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';
    
    // 弹簧物理逻辑：展开目标，同时互斥关闭其他同级内容
    if (!isExpanded) {
        document.querySelectorAll('.accordion-content').forEach(menu => {
            menu.style.maxHeight = '0px';
        });
        // 动态计算内容高度实现弹簧顺滑伸展
        el.style.maxHeight = el.scrollHeight + "px";
    } else {
        el.style.maxHeight = "0px";
    }
}

// 手机端子菜单增强逻辑 - 特别针对华为和 iOS 系统解除父容器高度限制
function toggleSubMenu(id) {
    const el = document.getElementById(id);
    const parent = document.getElementById('mobile-drawer'); 
    if (!el) return;

    const isExpanded = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';
    el.style.maxHeight = isExpanded ? '0px' : el.scrollHeight + "px";

    // 防截断补丁：子项展开后允许父级容器无限伸缩，解决看不见第二页的 Bug
    if (parent && !isExpanded) {
        setTimeout(() => {
            parent.style.maxHeight = 'none';
        }, 10);
    }
}

/**
 * 2. 核心引擎对象 (MainEngine)
 */
const MainEngine = {
    langData: null,
    currentLang: localStorage.getItem('lang') || 'en',

    async init() {
        console.log("%c [SYS] Master Engine Ignition... ", "background: #A11219; color: #fff; font-weight: bold;");
        
        await this.initI18n();      // 初始化多语种同步引擎
        this.bindGlobalEvents();    // 绑定社交、智能情报矩阵与页脚矩阵交互
        this.initUX();              // 激活数字化微光、图片守护与动效补丁
        this.applyPhysicalPatches(); // 动态注入布局主权物理补丁
    },

    // 多语种初始化与本地化映射 [支持 SKU 字段动态翻译]
    async initI18n() {
        try {
            const resp = await fetch('locales.json');
            this.langData = await resp.json();
            this.switchLang(this.currentLang);
        } catch (e) {
            console.warn("[SYS] i18n Data missing, using static fallbacks.");
        }
    },

    switchLang(lang) {
        if (!this.langData || !this.langData[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.langData[lang][key]) el.innerHTML = this.langData[lang][key];
        });

        document.documentElement.lang = lang;
        console.log(`[SYS] Language Switched: ${lang}`);
    },

    bindGlobalEvents() {
        // 全球情报矩阵路由 [data-intel] - 吸取 Panjiva/Trademo 优势
        document.querySelectorAll('[data-intel]').forEach(btn => {
            btn.addEventListener('click', () => {
                const node = btn.getAttribute('data-intel');
                const intelMatrix = {
                    Panju: "https://www.panjiva.com",
                    Trademo: "https://www.trademo.com",
                    ImportYeti: "https://www.importyeti.com",
                    ZoomInfo: "https://www.zoominfo.com",
                    Gemini: "https://gemini.google.com"
                };
                if (intelMatrix[node]) window.open(intelMatrix[node], '_blank');
            });
        });

        // 社交/API 连接分发 [data-connect]
        document.querySelectorAll('[data-connect]').forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.getAttribute('data-connect');
                const protocols = {
                    LinkedIn: "https://www.linkedin.com/in/alex-yang-yishen/",
                    WhatsApp: "https://wa.me/8618857277313",
                    WeChat: "https://work.weixin.qq.com/ca/dg800057277313"
                };
                if (protocols[platform]) window.open(protocols[platform], '_blank');
            });
        });

        // Windows 办公端交互补丁：点击外部自动收起所有弹簧菜单
        document.addEventListener("click", (e) => {
            const isNav = e.target.closest('#master-nav');
            const isAccordion = e.target.closest('.accordion-content');
            const isBtn = e.target.closest('button[onclick*="toggle"]');
            
            if (!isNav && !isAccordion && !isBtn) {
                document.querySelectorAll('.accordion-content').forEach(menu => {
                    menu.style.maxHeight = '0px';
                });
            }
        });
    },

    initUX() {
        // 数字化微光跟随 - GPU 加速处理
        const glow = document.getElementById('cursor-glow');
        if (glow) {
            document.addEventListener('mousemove', (e) => {
                requestAnimationFrame(() => {
                    glow.style.left = `${e.clientX}px`;
                    glow.style.top = `${e.clientY}px`;
                });
            });
        }

        // 图片加载守护 - 针对 120+ SKU 矩阵防止布局闪烁
        document.querySelectorAll("img").forEach(img => {
            if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
            img.addEventListener("error", () => { img.style.display = "none"; });
        });

        // 视口入场动效
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
    },

    /**
     * 3. 布局主权物理补丁：动态注入样式修复 Logo 截断与响应式 Bug
     */
    applyPhysicalPatches() {
        const style = document.createElement('style');
        style.innerHTML = `
            /* 强制 Logo 物理防御 */
            .site-logo, .site-logo svg, .footer-logo-wrapper svg { height: 32px !important; width: auto !important; overflow: visible !important; }
            /* 弹簧菜单层级主权置顶 */
            #master-nav { z-index: 100000 !important; backdrop-filter: blur(20px); }
            /* 手机端响应式修正：解决页脚矩阵看不全与内容重叠 Bug */
            @media (max-width: 768px) {
                .hero, .page-hero { height: auto !important; padding-top: 120px !important; padding-bottom: 60px !important; }
                /* 页脚矩阵在手机端自动转为双列布局，防止内容截断 */
                footer .grid-cols-2, footer .grid-cols-4, footer .grid-cols-5 { 
                    grid-template-columns: repeat(2, 1fr) !important; 
                    gap: 24px !important; 
                }
                /* 强化页脚地图在手机端的显示比例 */
                footer .aspect-[21/9] { aspect-ratio: 4/3 !important; }
            }
        `;
        document.head.appendChild(style);
        console.log("[SYS] Layout Sovereignty Patches Injected Successfully.");
    }
};

document.addEventListener('DOMContentLoaded', () => MainEngine.init());
