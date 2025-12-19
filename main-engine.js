/**
 * Yishen Global — Integrated Logic Engine 2026
 * Version: 2026.FINAL.MASTER (Social API & Kinetic UX Integrated)
 * Logic: Sovereignty, Social Routing & Kinetic UX
 */

const MainEngine = {
    langData: null,
    isMenuOpen: false,

    /**
     * 1. 中心化社交协议 (Sovereign Social Protocol)
     * 解决“联系方式重复”的痛点：全站调用此唯一数据源
     */
    socialProtocol: {
        LinkedIn: "https://www.linkedin.com/company/yishen-global",
        WhatsApp: "https://wa.me/你的电话号码", 
        Instagram: "https://instagram.com/yishen_global",
        X: "https://x.com/yishen_global",
        WeChat: "yishen_support", // 仅在特定交互中弹出
        Email: "protocol@yishenglobal.com"
    },

    /**
     * 系统初始化点火
     */
    async init() {
        console.log("%c [SYS] Master Engine Ignition... ", "background: #0ea5e9; color: #000; font-weight: bold;");

        // 1. 加载全球语种资源包
        try {
            const resp = await fetch('locales.json');
            if (!resp.ok) throw new Error('Locales missing');
            this.langData = await resp.json();
            this.switchLang(localStorage.getItem('lang') || 'en');
        } catch (error) {
            console.warn("[SYS] i18n Data Load Failure, falling back to static content.");
        }

        // 2. 激活高科技蓝/动漫效果懒加载引擎
        this.initLazyLoad();

        // 3. 激活数字化微光追踪 (Digital Twin Aura)
        this.initCursorGlow();

        // 4. 初始化社交媒体 API 绑定 (防止重复渲染)
        this.bindSocialActions();

        // 5. 监听全局导航栏滚动状态
        window.addEventListener('scroll', () => this.handleScroll());
    },

    /**
     * 2. 社交媒体路由分发补丁
     * 确保全站任何按钮点击后，通过统一 API 跳转，不产生重复冗余
     */
    bindSocialActions() {
        document.querySelectorAll('[data-connect]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const platform = btn.getAttribute('data-connect');
                const url = this.socialProtocol[platform];
                if (url) {
                    window.open(url, '_blank');
                    console.log(`[SYS] API Route Executed: ${platform}`);
                }
            });
        });
    },

    /**
     * 移动端汉堡菜单开关逻辑
     */
    toggleMobileMenu() {
        const menu = document.getElementById('main-menu');
        const toggle = document.querySelector('.mobile-toggle');
        
        this.isMenuOpen = !this.isMenuOpen;
        menu.classList.toggle('mobile-active');
        toggle.classList.toggle('active');

        // 汉堡按钮动漫逻辑补丁
        if (this.isMenuOpen) {
            toggle.children[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            toggle.children[1].style.opacity = "0";
            toggle.children[2].style.transform = "rotate(-45deg) translate(6px, -7px)";
            document.body.style.overflow = 'hidden';
        } else {
            toggle.children[0].style.transform = "none";
            toggle.children[1].style.opacity = "1";
            toggle.children[2].style.transform = "none";
            document.body.style.overflow = 'auto';
        }
    },

    /**
     * 全语种实时映射引擎 (支持 RTL 镜像补丁)
     */
    switchLang(lang) {
        if (!this.langData || !this.langData[lang]) return;
        localStorage.setItem('lang', lang);
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.langData[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = this.langData[lang][key];
                } else {
                    el.innerHTML = this.langData[lang][key];
                }
            }
        });

        const isRTL = ['ar', 'he', 'fa'].includes(lang);
        document.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    },

    /**
     * 高科技蓝/动漫懒加载补丁 (集成了 Cyber Scanner)
     */
    initLazyLoad() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const container = img.parentElement;

                    if (container && container.classList.contains('lazy-container')) {
                        const scanner = document.createElement('div');
                        scanner.className = 'cyber-scanner';
                        container.appendChild(scanner);
                        
                        img.src = img.dataset.src;
                        img.onload = () => {
                            img.classList.add('img-loaded');
                            setTimeout(() => scanner.remove(), 1200);
                        };
                    } else {
                        img.src = img.dataset.src;
                        img.onload = () => img.classList.add('img-loaded');
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: "0px 0px 300px 0px" });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    },

    /**
     * 数字化微光追踪
     */
    initCursorGlow() {
        const glow = document.getElementById('cursor-glow');
        if (!glow) return;
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            });
        });
    },

    /**
     * 导航栏滚动逻辑同步
     */
    handleScroll() {
        const nav = document.getElementById('master-nav');
        if (!nav) return;
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
};

// 系统自启动
document.addEventListener('DOMContentLoaded', () => MainEngine.init());
