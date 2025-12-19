/**
 * Yishen Global — Integrated Logic Engine 2026
 * Version: 2026.ULTIMATE.MASTER (Hybrid Intelligence & Kinetic UX)
 * Logic: Sovereignty, Trade Intel Matrix & Digital Twin UX
 */

const MainEngine = {
    langData: null,
    isMenuOpen: false,

    // 1. 核心协议矩阵 (Unified Protocol Matrix)
    protocols: {
        // 社交与通讯协议 (Social & Contact)
        social: {
            LinkedIn: "https://www.linkedin.com/in/alex-yang-yishen/", 
            WhatsApp: ["https://wa.me/8618857277313", "https://wa.me/8615968277867"],
            Email: ["alex.yang@yishenglobal.net", "champion.yang@yishenglobal.net"],
            Hotline: ["+86 188 5727 7313", "+86 195 3039 4133"],
            WeChat: "https://work.weixin.qq.com/ca/dg800057277313",
            Instagram: "https://instagram.com/yishen_global",
            X: "https://x.com/yishen_global"
        },
        // 全球情报矩阵协议 (Global Intel Matrix)
        intel: {
            Panju: "https://www.panjiva.com",
            ImportKey: "https://www.importkey.com",
            Trademo: "https://www.trademo.com",
            PortExaminer: "https://portexaminer.com",
            ImportInfo: "https://www.importinfo.com",
            ImportGenius: "https://www.importgenius.com",
            ImportYeti: "https://www.importyeti.com",
            ZoomInfo: "https://www.zoominfo.com",
            RocketReach: "https://rocketreach.co",
            Lusha: "https://www.lusha.com",
            Fastbase: "https://www.fastbase.com",
            Apollo: "https://apollo.io",
            Gemini: "https://gemini.google.com",
            AIStudio: "https://aistudio.google.com",
            NotebookLM: "https://notebooklm.google.com",
            Grok: "https://grok.com",
            Perplexity: "https://www.perplexity.ai"
        }
    },

    /**
     * 系统点火 (Ignition)
     */
    async init() {
        console.log("%c [SYS] Ultimate Engine Ignition... ", "background: #A11219; color: #fff; font-weight: bold;");

        // 1. 初始化多语种 (i18n)
        await this.initI18n();

        // 2. 激活 UX 动效 (Kinetic UX)
        this.initLazyLoad();
        this.initCursorGlow();

        // 3. 激活双矩阵监听 (Dual Matrix Listeners)
        this.bindEvents();

        // 4. 监听滚动
        window.addEventListener('scroll', () => this.handleScroll());
    },

    /**
     * 事件统一绑定 (API & Intel Dispatcher)
     */
    bindEvents() {
        // 监听社交按钮 [data-connect]
        document.querySelectorAll('[data-connect]').forEach(btn => {
            btn.addEventListener('click', () => this.executeSocialAPI(btn.getAttribute('data-connect')));
        });

        // 监听情报按钮 [data-intel]
        document.querySelectorAll('[data-intel]').forEach(btn => {
            btn.addEventListener('click', () => this.launchIntelNode(btn.getAttribute('data-intel')));
        });
    },

    // 执行社交跳转逻辑
    executeSocialAPI(platform) {
        let target = this.protocols.social[platform];
        if (Array.isArray(target)) {
            if (platform === 'Email') { window.location.href = `mailto:${target[0]}`; return; }
            target = target[0]; 
        }
        if (target) {
            if (platform === 'Hotline') { window.location.href = `tel:${target.replace(/\s+/g, '')}`; return; }
            window.open(target, '_blank');
        }
    },

    // 执行情报矩阵跳转
    launchIntelNode(key) {
        const url = this.protocols.intel[key];
        if (url) {
            console.log(`[SYS] Intel Matrix Route: ${key}`);
            window.open(url, '_blank');
        }
    },

    /**
     * 多语种与 UX 辅助函数 (保持动漫级体验)
     */
    async initI18n() {
        try {
            const resp = await fetch('locales.json');
            this.langData = await resp.json();
            this.switchLang(localStorage.getItem('lang') || 'en');
        } catch (e) { console.warn("[SYS] Fallback to static."); }
    },

    switchLang(lang) {
        if (!this.langData || !this.langData[lang]) return;
        localStorage.setItem('lang', lang);
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.langData[lang][key];
            if (translation) el.innerHTML = translation;
        });
    },

    initCursorGlow() {
        const glow = document.getElementById('cursor-glow');
        if (!glow) return;
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                glow.style.left = `${e.clientX}px`;
                glow.style.top = `${e.clientY}px`;
            });
        });
    },

    initLazyLoad() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('img-loaded');
                    observer.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
    },

    handleScroll() {
        const nav = document.getElementById('master-nav');
        if (nav) window.scrollY > 60 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
    }
};

document.addEventListener('DOMContentLoaded', () => MainEngine.init());
