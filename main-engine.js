/**
 * YISHEN GLOBAL — Integrated Logic Engine 2026
 * Version: 2026.FINAL.MASTER
 * Logic: Sovereignty, Multi-Region Adaptation & Kinetic UX
 */

const MainEngine = {
    langData: null,
    isMenuOpen: false,

    /**
     * 系统初始化点火
     */
    async init() {
        console.log("%c [SYS] Master Engine Ignition... ", "background: #0ea5e9; color: #000; font-weight: bold;");

        // 1. 加载全球语种资源包 (欧盟、APEC、中东、拉美等)
        try {
            const resp = await fetch('locales.json');
            if (!resp.ok) throw new Error('Locales missing');
            this.langData = await resp.json();
            this.switchLang(localStorage.getItem('lang') || 'en');
        } catch (error) {
            console.error("[SYS] i18n Data Load Failure:", error);
        }

        // 2. 激活高科技蓝/动漫效果懒加载引擎
        this.initLazyLoad();

        // 3. 激活数字化微光追踪 (Digital Twin Aura)
        this.initCursorGlow();

        // 4. 监听全局导航栏滚动状态
        window.addEventListener('scroll', () => this.handleScroll());
    },

    /**
     * 移动端汉堡菜单开关逻辑 (补丁集成)
     * 解决手机端找不到导航条的痛点，并实现高科技蓝磨砂面板
     */
    toggleMobileMenu() {
        const menu = document.getElementById('main-menu');
        const toggle = document.querySelector('.mobile-toggle');
        
        this.isMenuOpen = !this.isMenuOpen;
        
        // 切换菜单显示状态
        menu.classList.toggle('mobile-active');
        toggle.classList.toggle('active');

        // 汉堡按钮变成“X”的动漫逻辑补丁
        if (this.isMenuOpen) {
            toggle.children[0].style.transform = "rotate(45deg) translate(6px, 6px)";
            toggle.children[1].style.opacity = "0";
            toggle.children[2].style.transform = "rotate(-45deg) translate(6px, -7px)";
            // 防止背景滚动
            document.body.style.overflow = 'hidden';
        } else {
            toggle.children[0].style.transform = "none";
            toggle.children[1].style.opacity = "1";
            toggle.children[2].style.transform = "none";
            document.body.style.overflow = 'auto';
        }
    },

    /**
     * 全语种实时映射引擎 (i18n)
     * 支持 RTL (阿拉伯语/希伯来语) 镜像补丁
     */
    switchLang(lang) {
        if (!this.langData || !this.langData[lang]) return;
        
        localStorage.setItem('lang', lang);
        
        // 执行 DOM 文字映射
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.langData[lang][key]) {
                // 如果是输入框则映射 placeholder，否则映射 innerHTML
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = this.langData[lang][key];
                } else {
                    el.innerHTML = this.langData[lang][key];
                }
            }
        });

        // RTL 适配：针对中东/北非市场
        const isRTL = ['ar', 'he', 'fa'].includes(lang);
        document.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        console.log(`[SYS] UI Protocol switched to: ${lang.toUpperCase()}`);
    },

    /**
     * 高科技蓝/动漫懒加载补丁
     * 集成了电子扫描线 (Cyber Scanner) 的动态创建
     */
    initLazyLoad() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const container = img.parentElement;

                    // 1. 注入扫描线 DOM (补丁逻辑)
                    if (container && container.classList.contains('lazy-container')) {
                        const scanner = document.createElement('div');
                        scanner.className = 'cyber-scanner';
                        container.appendChild(scanner);
                        
                        // 2. 加载高清资产
                        img.src = img.dataset.src;
                        img.onload = () => {
                            img.classList.add('img-loaded');
                            // 扫描完成动画淡出
                            setTimeout(() => scanner.remove(), 1200);
                        };
                    } else {
                        // 常规加载
                        img.src = img.dataset.src;
                        img.onload = () => img.classList.add('img-loaded');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, { 
            rootMargin: "0px 0px 300px 0px" // 提前加载提高体验
        });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    },

    /**
     * 数字化微光追踪 (Digital Twin Aura)
     */
    initCursorGlow() {
        const glow = document.getElementById('cursor-glow');
        if (!glow) return;
        
        document.addEventListener('mousemove', (e) => {
            // 使用 requestAnimationFrame 优化性能
            requestAnimationFrame(() => {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            });
        });
    },

    /**
     * 导航栏滚动逻辑同步补丁
     */
    handleScroll() {
        const nav = document.getElementById('master-nav');
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
};

// 系统自启动
document.addEventListener('DOMContentLoaded', () => MainEngine.init());
