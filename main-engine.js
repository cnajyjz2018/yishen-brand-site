/**
 * Yishen Global — Integrated Logic Engine 2026
 * Version: 2026.FINAL.MASTER (Social API & Kinetic UX Integrated)
 * Logic: Sovereignty, Social Routing & Kinetic UX
 */

const MainEngine = {
    langData: null,
    isMenuOpen: false,

    /**
     * 1. 中心化社交与联系协议 (Sovereign Social & Contact Protocol)
     * 深度解决技术链路：集成 Alex & Champion 核心团队及微信 API 直连模式
     */
    socialProtocol: {
        // 领英个人主页：补全协议头，确保浏览器精准跳转 
        LinkedIn: "https://www.linkedin.com/in/alex-yang-yishen/", 
        
        // WhatsApp 集群：支持数组管理，默认唤起 Alex 主联系人 
        WhatsApp: [
            "https://wa.me/8618857277313",
            "https://wa.me/8615968277867"
        ],
        
        // 团队电邮矩阵 
        Email: [
            "alex.yang@yishenglobal.net",
            "champion.yang@yishenglobal.net"
        ],

        // 官方热线 (Hotline API) 
        Hotline: [
            "+86 188 5727 7313",
            "+86 195 3039 4133"
        ],
        
        // 微信直连：支持通过特定链接或扫码协议贯通
        WeChat: "https://work.weixin.qq.com/ca/dg800057277313", // 示例：企业微信直连码路径
        
        Instagram: "https://instagram.com/yishen_global",
        X: "https://x.com/yishen_global"
    },

    /**
     * 系统初始化点火 (Ignition)
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

        // 4. 初始化社交媒体 API 绑定 (解决 404 与重复渲染)
        this.bindSocialActions();

        // 5. 监听全局导航栏滚动状态
        window.addEventListener('scroll', () => this.handleScroll());
    },

    /**
     * 2. 社交媒体路由分发补丁 (The API Dispatcher)
     * 确保全站任何 data-connect 按钮点击后，通过统一逻辑唤起
     */
    bindSocialActions() {
        document.querySelectorAll('[data-connect]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const platform = btn.getAttribute('data-connect');
                this.executeAPI(platform);
            });
        });
    },

    /**
     * 执行 API 唤起逻辑 (互联互通模式)
     * @param {string} platform - 目标平台名称
     */
    executeAPI(platform) {
        let target = this.socialProtocol[platform];
        
        // 智能分发逻辑：如果是数组（如 WhatsApp/Email/Hotline），默认调用首选联系人
        if (Array.isArray(target)) {
            // 特殊处理 Email：唤起邮件客户端
            if (platform === 'Email') {
                window.location.href = `mailto:${target[0]}`;
                return;
            }
            target = target[0]; 
        }

        if (target) {
            // 如果是电话热线，唤起拨号
            if (platform === 'Hotline') {
                window.location.href = `tel:${target.replace(/\s+/g, '')}`;
                return;
            }
            
            // 微信/领英/WhatsApp 均执行新窗口唤起
            window.open(target, '_blank');
            console.log(`[SYS] Sovereign Route Triggered: ${platform}`);
        } else {
            console.error(`[SYS] Route Protocol Failure: ${platform} is not defined.`);
        }
    },

    /**
     * 移动端汉堡菜单开关逻辑 (集成动漫逻辑补丁)
     */
    toggleMobileMenu() {
        const menu = document.getElementById('main-menu');
        const toggle = document.querySelector('.mobile-toggle');
        
        this.isMenuOpen = !this.isMenuOpen;
        menu.classList.toggle('mobile-active');
        toggle.classList.toggle('active');

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
     * 全语种实时映射引擎
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
     * 数字化微光追踪 (Digital Twin Aura)
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
     * 懒加载与 Cyber Scanner 动效
     */
    initLazyLoad() {
        const imageObserver = new IntersectionObserver((entries) => {
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
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: "0px 0px 300px 0px" });
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    },

    /**
     * 导航栏状态控制
     */
    handleScroll() {
        const nav = document.getElementById('master-nav');
        if (nav) {
            window.scrollY > 60 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => MainEngine.init());
