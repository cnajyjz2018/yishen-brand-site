/**
 * Yishen Global — Integrated Master Engine 2026
 * Version: 2026.FINAL.LINKAGE
 * 功能：多语种同步、动态 SKU 路由、全球情报矩阵分发
 */

const MainEngine = {
    langData: null,
    currentLang: localStorage.getItem('lang') || 'en',

    async init() {
        console.log("%c [SYS] Master Engine Ignition... ", "background: #A11219; color: #fff; font-weight: bold;");
        
        // 1. 初始化多语种
        await this.initI18n();
        
        // 2. 绑定全局事件 (社交 API & 情报矩阵)
        this.bindGlobalEvents();
        
        // 3. 激活 UX 动效
        this.initUX();
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
     * 核心：多语种切换引擎 (支持动态 SKU 字段翻译)
     */
    switchLang(lang) {
        if (!this.langData || !this.langData[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('lang', lang);

        // 翻译静态 HTML 标记 [data-i18n]
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.langData[lang][key]) el.innerHTML = this.langData[lang][key];
        });

        // 触发 SKU 重新渲染 (如果存在 SKU 引擎)
        if (typeof renderSKU === 'function') renderSKU();
        if (typeof renderSKUList === 'function') renderSKUList();

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

        // 情报矩阵分发 [data-intel]
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
    },

    initUX() {
        // 数字化微光跟随
        const glow = document.getElementById('cursor-glow');
        if (glow) {
            document.addEventListener('mousemove', (e) => {
                requestAnimationFrame(() => {
                    glow.style.left = `${e.clientX}px`;
                    glow.style.top = `${e.clientY}px`;
                });
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => MainEngine.init());
