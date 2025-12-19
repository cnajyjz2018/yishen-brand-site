/**
 * YISHEN GLOBAL — Integrated Logic Engine 2026
 */
const MainEngine = {
    langData: null,

    async init() {
        // 1. 加载语言包
        const resp = await fetch('locales.json');
        this.langData = await resp.json();
        this.switchLang(localStorage.getItem('lang') || 'en');

        // 2. 激活高科技蓝懒加载
        this.initLazyLoad();
    },

    switchLang(lang) {
        if (!this.langData[lang]) return;
        localStorage.setItem('lang', lang);
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.langData[lang][key]) el.innerText = this.langData[lang][key];
        });
        document.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    },

    initLazyLoad() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('img-loaded');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: "0px 0px 200px 0px" });

        document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
    }
};

document.addEventListener('DOMContentLoaded', () => MainEngine.init());
