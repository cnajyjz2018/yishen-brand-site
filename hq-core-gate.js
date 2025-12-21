/* =========================================================
   YISHEN GLOBAL - HQ_CORE_GATE V5.0.FINAL.MASTER
   Logic: Total Integration (Core + Mapping + Tactical Intel)
   Integrated: GPU Engine, Terminal Logic, Geolocation Strike, Target Matrix
   Authority: Strategic Architecture Group / Yishen HQ (2026)
   ========================================================= */

(function() {
    "use strict";

    /**
     * 01_STRATEGIC_CONFIG: 核心主权配置与火控矩阵
     */
    const HQ_CONFIG = {
        version: "5.0.MASTER",
        status: "ACTIVE_NODE_HARVESTING",
        targetMatrix: ["ASHLEY_FURNITURE", "ODP_CORP", "LOWES", "JYSK", "AMAZON_COMMERCIAL"],
        intelKey: "1a174fbk3bd5d56961b4be235ed012552eb4c800", // RocketReach 对撞节点
        assetRoot: "public/assets/products/",
        // 全球战区对撞定义
        zones: {
            'NORTH_AMERICA': { codes: ['9401', '7616'], priority: 'BIFMA_ANSI', lang: 'en' },
            'LATAM': { codes: ['7315', '7312', '9401'], priority: 'AD_EXEMPT_GUIDE', lang: 'zh' },
            'EUROPE': { codes: ['4418', '9403'], priority: 'CBAM_COMPLIANCE', lang: 'en' },
            'ASEAN': { codes: ['7616', '9402'], priority: 'ORIGIN_NODE_PROVE', lang: 'zh' },
            'MIDDLE_EAST': { codes: ['7315', '9401'], priority: 'GULF_SPEC_CERT', lang: 'ar' }
        }
    };

    /**
     * 02_COMMAND_ENGINE: 指挥部内核对象
     */
    const HQ_Engine = {
        async init() {
            console.log(`%c // YISHEN_V5.0_COMMAND_ACTIVE // `, "background:#0ea5e3; color:#000; font-weight:bold;");
            
            this.initGlowEngine();      // 激活 GPU 微光追踪
            this.initNavSovereignty();  // 激活导航主权
            this.applyUXPatches();       // 激活物理布局守护
            
            // 启动全球地理对撞
            const userIntel = await this.detectUserSovereignty();
            this.applyGlobalMapping(userIntel);
            
            this.bindSovereignIntel();   // 绑定情报矩阵
            window.YishenHQ = HQ_CONFIG; 
        },

        // GPU 加速微光跟随
        initGlowEngine() {
            const glow = document.getElementById('cursor-glow');
            if (glow) {
                window.addEventListener('mousemove', (e) => {
                    requestAnimationFrame(() => {
                        glow.style.left = `${e.clientX}px`;
                        glow.style.top = `${e.clientY}px`;
                    });
                });
            }
        },

        // 地理主权感知补丁
        async detectUserSovereignty() {
            const lang = navigator.language.toLowerCase();
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            let zone = 'NORTH_AMERICA'; 

            if (lang.includes('ar')) zone = 'MIDDLE_EAST';
            else if (lang.includes('es') || lang.includes('pt')) zone = 'LATAM';
            else if (tz.includes('Europe/')) zone = 'EUROPE';
            else if (tz.includes('Asia/')) zone = 'ASEAN';

            return { zone, lang: lang.split('-')[0] };
        },

        // 应用全球映射逻辑 (RTL + 语意 + 优先级)
        applyGlobalMapping(intel) {
            const config = HQ_CONFIG.zones[intel.zone] || HQ_CONFIG.zones['NORTH_AMERICA'];
            const activeLang = ['zh', 'en', 'ar'].includes(intel.lang) ? intel.lang : config.lang;

            localStorage.setItem('YS_ACTIVE_ZONE', intel.zone);
            localStorage.setItem('YS_PRIORITY_PROTOCOL', config.priority);

            // 物理层调整：处理 RTL 与 语言标签
            document.body.dir = (activeLang === 'ar') ? 'rtl' : 'ltr';
            document.documentElement.lang = activeLang;

            // 动态高亮对应战区的产业勋章
            document.querySelectorAll('.cert-node').forEach(node => {
                const relCodes = node.getAttribute('data-codes');
                if (relCodes && config.codes.some(c => relCodes.includes(c))) {
                    node.style.borderBottom = "2px solid #0ea5e3";
                    node.classList.add('zone-active');
                }
            });
        },

        // 物理布局补丁：根除 404 破碎感
        applyUXPatches() {
            document.querySelectorAll("img").forEach(img => {
                img.setAttribute("loading", "lazy");
                img.addEventListener("error", () => { img.style.opacity = "0"; });
            });
            const style = document.createElement('style');
            style.innerHTML = `
                .zone-active { filter: drop-shadow(0 0 5px #0ea5e3); opacity: 1 !important; }
                [dir="rtl"] .flex-row { flex-direction: row-reverse; }
            `;
            document.head.appendChild(style);
        },

        // 绑定全球情报矩阵路由
        bindSovereignIntel() {
            const matrix = {
                Panju: "https://www.panjiva.com",
                Trademo: "https://www.trademo.com",
                ImportYeti: "https://www.importyeti.com",
                LinkedIn: "https://www.linkedin.com/company/yishen-global"
            };
            document.addEventListener('click', (e) => {
                const target = e.target.closest('[data-intel]');
                if (target) {
                    const node = target.getAttribute('data-intel');
                    if (matrix[node]) window.open(matrix[node], '_blank');
                }
            });
        },

        initNavSovereignty() {
            const nav = document.getElementById('master-nav');
            if (!nav) return;
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY > 50;
                nav.style.background = scrolled ? "rgba(1, 4, 9, 0.98)" : "rgba(1, 4, 9, 0.95)";
                nav.style.height = scrolled ? "70px" : "80px";
            });
        }
    };

    /**
     * 03_TERMINAL_LOGIC: 5.0 实战对撞终端
     */
    window.runAgent = function() {
        const input = document.getElementById('user-task');
        const output = document.getElementById('agent-output');
        if (!input || !output || !input.value) return;

        output.innerHTML = `<span class="text-[#0ea5e3]">> INITIATING_V5_MISSION: [${input.value.toUpperCase()}]</span>`;
        const logs = [
            `> SCANNING_TARGET_MATRIX: [${HQ_CONFIG.targetMatrix.join(", ")}]`,
            `> GEOLOCATION_STRIKE: [${localStorage.getItem('YS_ACTIVE_ZONE')}]`,
            "> AUTHENTICATING_ROCKET_REACH_KEY: [CONNECTED]",
            "> COLLIDING_7_DIMENSION_ASSETS..."
        ];

        let i = 0;
        const interval = setInterval(() => {
            const div = document.createElement('div');
            div.className = "mt-1 opacity-70 font-mono text-[10px]";
            div.innerText = logs[i];
            output.appendChild(div);
            i++;
            if (i === logs.length) clearInterval(interval);
        }, 500);
    };

    document.addEventListener('DOMContentLoaded', () => HQ_Engine.init());
})();
