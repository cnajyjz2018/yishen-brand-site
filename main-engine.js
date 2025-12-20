/* =========================================================
   YiShen Global — Integrated Master Engine 2026
   Version: 2026.FINAL.MASTER (Integrated & Frozen)
   Logic: Navigation Spring-Action, i18n Sync, Intel Matrix Routing
   ========================================================= */

/**
 * Global Interaction Hooks
 * 这些函数放在全局作用域，确保 HTML 中的 onclick 属性可直接调用
 */

// 1. 核心交互：弹簧式伸缩菜单
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

// 2. 手机端子菜单增强：处理嵌套展开高度计算与防截断补丁
function toggleSubMenu(id) {
    const el = document.getElementById(id);
    const parent = document.getElementById('mobile-drawer'); // 对应移动端侧边栏 ID
    if (!el) return;

    const isExpanded = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';
    el.style.maxHeight = isExpanded ? '0px' : el.scrollHeight + "px";

    // 补丁：如果子菜单展开，强制父容器高度设为 auto，防止内容被截断
    if (parent && !isExpanded) {
        setTimeout(() => {
            parent.style.maxHeight = 'none';
        }, 10);
    }
}

const MainEngine = {
    langData: null,
    currentLang: localStorage.getItem('lang') || 'en',

    async init() {
        console.log("%c [SYS] Master Engine Ignition... ", "background: #A11219; color: #fff; font-weight: bold;");
        
        await this.initI18n();      // 1. 初始化多语种
        this.bindGlobalEvents();    // 2. 绑定全局事件 (社交 & 情报矩阵)
        this.initUX();              // 3. 激活 UX 动效与安全补丁
    },

    async initI18n() {
        try {
            const resp = await fetch('locales.json');
            this.langData = await resp.json();
            this.switchLang(this.currentLang);
        } catch (e) {
            console.warn("[SYS] i18n Data missing, using static fallbacks.");
        }
    },

    /**
     * 多语种切换引擎 (支持动态 SKU 字段翻译)
     */
    switchLang(lang) {
        if (!this.langData || !this.langData[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('lang', lang);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.langData[lang][key]) el.innerHTML = this.langData[lang][key];
        });

        if (typeof renderSKU === 'function') renderSKU();
        
        document.documentElement.lang = lang;
        console.log(`[SYS] Language Switched: ${lang}`);
    },

    bindGlobalEvents() {
        // 社交媒体分发 [data-connect]
        document.querySelectorAll('[data-connect]').forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.getAttribute('data-connect');
                const socialProtocols = {
                    LinkedIn: "https://www.linkedin.com/in/alex-yang-yishen/",
                    WhatsApp: "https://wa.me/8618857277313",
                    WeChat: "https://work.weixin.qq.com/ca/dg800057277313"
                };
                if (socialProtocols[platform]) window.open(socialProtocols[platform], '_blank');
            });
        });

        // 情报矩阵分发 [data-intel] - 吸取 ImportGenius & Trademo 优势
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
                if (intelMatrix[node]) {
                    console.log(`[SYS] Routing to Intel Node: ${node}`);
                    window.open(intelMatrix[node], '_blank');
                }
            });
        });

        // 交互补丁：点击外部自动收起弹簧菜单
        document.addEventListener("click", (e) => {
            if (!e.target.closest('#master-nav') && !e.target.closest('.accordion-content')) {
                document.querySelectorAll('.accordion-content').forEach(menu => {
                    menu.style.maxHeight = '0px';
                });
            }
        });
    },

    initUX() {
        // 数字化微光跟随 (Digital Twin Glow)
        const glow = document.getElementById('cursor-glow');
        if (glow) {
            document.addEventListener('mousemove', (e) => {
                requestAnimationFrame(() => {
                    glow.style.left = `${e.clientX}px`;
                    glow.style.top = `${e.clientY}px`;
                });
            });
        }

        // 图片加载守护 (Image Load Guard) - 防止 120+ SKU 闪烁
        const images = document.querySelectorAll("img");
        images.forEach(img => {
            if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
            img.addEventListener("error", () => { img.style.display = "none"; });
        });

        // 平滑入场动效
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
    }
};

document.addEventListener('DOMContentLoaded', () => MainEngine.init());
