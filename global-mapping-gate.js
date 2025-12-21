/**
 * YISHEN GLOBAL - GLOBAL_MAPPING_GATE V5.0 MASTER
 * 逻辑集成：[GEOLOCATION_STRIKE], [SEMANTIC_ALIGNMENT], [RTL_SUPPORT]
 * 权限：Strategic Architecture Group (2026)
 */

(function () {
    "use strict";

    class GlobalMappingGate {
        constructor() {
            // [PROTOCOL] 1. 全球战区、HS Code 与 语言矩阵的对撞定义
            this.matrix = {
                'NORTH_AMERICA': { 
                    codes: ['9401', '7616'], 
                    priority: 'BIFMA_ANSI', 
                    lang: 'en',
                    redirect: 'clusters.html?zone=na' 
                },
                'LATAM': { 
                    codes: ['7315', '7312', '9401'], 
                    priority: 'AD_EXEMPT_GUIDE', 
                    lang: 'zh', // 或 'es' 
                    redirect: 'clusters.html?zone=latam' 
                },
                'EUROPE': { 
                    codes: ['4418', '9403'], 
                    priority: 'CBAM_COMPLIANCE', 
                    lang: 'en',
                    redirect: 'clusters.html?zone=eu' 
                },
                'ASEAN': { 
                    codes: ['7616', '9402'], 
                    priority: 'ORIGIN_NODE_PROVE', 
                    lang: 'zh',
                    redirect: 'clusters.html?zone=asean' 
                },
                'MIDDLE_EAST': {
                    codes: ['7315', '9401'],
                    priority: 'GULF_SPEC_CERT',
                    lang: 'ar',
                    redirect: 'clusters.html?zone=me'
                }
            };

            // [SOVEREIGN_LANG_PACKS] 2. 全球主权语意包 (含七大维度定义)
            this.db = {
                en: {
                    hero_title: "INDUSTRIAL SOVEREIGNTY",
                    sector_furniture: "Seating Architecture (HS 9401)",
                    sector_maritime: "Industrial Chains (HS 7315)",
                    sector_medical: "Clinical Precision Nodes (HS 9402)",
                    protocol: "BIFMA_X5.1_VERIFIED"
                },
                zh: {
                    hero_title: "工业主权 · 全球集成",
                    sector_furniture: "精密座椅架构 (HS 9401)",
                    sector_maritime: "长虹工业制链 (HS 7315)",
                    sector_medical: "医疗精密控制终端 (HS 9402)",
                    protocol: "BIFMA_性能指标已验证"
                },
                ar: {
                    hero_title: "السيادة الصناعية",
                    sector_furniture: "هندسة المقاعد (HS 9401)",
                    sector_maritime: "سلاسل صناعية (HS 7315)",
                    protocol: "بروتوكول موثق"
                }
            };

            this.init();
        }

        async init() {
            console.log(">>> [GATE_V5]: INITIATING_GEOPOLITICAL_ROUTING...");
            const userIntel = await this.detectUserSovereignty();
            this.applyZoneAndLang(userIntel);
        }

        /**
         * [PATCH] 地理与语言双重探测
         */
        async detectUserSovereignty() {
            const lang = navigator.language.toLowerCase();
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            let zone = 'NORTH_AMERICA'; // 默认战区
            if (lang.includes('ar')) zone = 'MIDDLE_EAST';
            else if (lang.includes('es') || lang.includes('pt')) zone = 'LATAM';
            else if (tz.includes('Europe/')) zone = 'EUROPE';
            else if (tz.includes('Asia/')) zone = 'ASEAN';

            return { zone, lang: lang.split('-')[0] };
        }

        /**
         * [PATCH] 路径与语意重定向逻辑
         */
        applyZoneAndLang(intel) {
            const config = this.matrix[intel.zone] || this.matrix['NORTH_AMERICA'];
            const activeLang = this.db[intel.lang] ? intel.lang : config.lang;

            // 1. 物理层：设置主权标签至 LocalStorage
            localStorage.setItem('YS_ACTIVE_ZONE', intel.zone);
            localStorage.setItem('YS_PRIORITY_PROTOCOL', config.priority);
            localStorage.setItem('YIS_GATE_LANG', activeLang);

            // 2. 视觉层：应用语意对撞
            this.renderText(activeLang);

            // 3. 物理层：处理 RTL 布局
            document.body.dir = (activeLang === 'ar') ? 'rtl' : 'ltr';
            document.documentElement.lang = activeLang;

            console.log(`> GATE_LOCKED: [${intel.zone}] | LANG: [${activeLang}] | PROTOCOL: ${config.priority}`);
            
            // 4. 动态高亮对应战区的产业勋章
            this.highlightSectorIcons(config.codes);
        }

        renderText(langCode) {
            const dict = this.db[langCode];
            document.querySelectorAll('[data-sov-text]').forEach(node => {
                const key = node.getAttribute('data-sov-text');
                if (dict[key]) node.innerText = dict[key];
            });
        }

        highlightSectorIcons(codes) {
            document.querySelectorAll('.cert-node').forEach(node => {
                const relCodes = node.getAttribute('data-codes');
                if (relCodes && codes.some(c => relCodes.includes(c))) {
                    node.style.borderBottom = "2px solid #0ea5e3";
                    node.classList.add('zone-active');
                }
            });
        }
    }

    // [INITIALIZE]
    window.MappingGate = new GlobalMappingGate();
})();
