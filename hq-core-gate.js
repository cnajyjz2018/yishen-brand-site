/* =========================================================
   YISHEN GLOBAL - HQ_CORE_GATE V4.0.FINAL.MASTER
   Logic: Central Command Hub & Sovereign Offensive Engine
   Integrated: GPU Engine, Terminal Logic, RocketReach Auth, Target Matrix
   Authority: Strategic Architecture Group / Yishen HQ
   ========================================================= */

(function() {
    "use strict";

    /**
     * 01_STRATEGIC_CONFIG: 核心主权配置与情报防火墙
     * 包含针对全球零售巨头的进攻性目标映射
     */
    const HQ_CORE = {
        SOVEREIGN_ID: "YISHEN_2026_FINAL_AUTHORITY",
        VERSION: "4.0.MASTER",
        DEPLOY_STATUS: "ACTIVE_NODE_HARVESTING",
        ENCRYPTION_LEVEL: "INDUSTRIAL_STRENGTH",
        
        // 实战进攻目标节点：指向全球贸易主权方
        TARGET_MATRICES: {
            RETAIL_GIANTS: ["ASHLEY_FURNITURE", "ODP_CORP", "LOWES", "JYSK"],
            INDUSTRIAL_NODES: ["PORT_AUTHORITIES", "FLEET_OPERATORS", "MARITIME_OPS"],
            EU_COMPLIANCE: ["CBAM_AUDIT_READY"]
        },

        // 斩首行动核心 API 密钥 (RocketReach 对撞节点)
        INTEL_FIREWALL: {
            ROCKET_REACH_KEY: "1a174fbk3bd5d56961b4be235ed012552eb4c800",
            REDDIT_SENTIMENT: "ORACLE_V4_ACTIVE"
        }
    };

    /**
     * 02_GLOBAL_HOOKS: 核心交互钩子
     * 支撑全站弹簧式 UI 逻辑
     */
    window.toggleSpringMenu = function(id) {
        const el = document.getElementById(id);
        if (!el) return;
        const isExpanded = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';
        if (!isExpanded) {
            document.querySelectorAll('.accordion-content').forEach(menu => menu.style.maxHeight = '0px');
            el.style.maxHeight = el.scrollHeight + "px";
        } else {
            el.style.maxHeight = "0px";
        }
    };

    /**
     * 03_COMMAND_ENGINE: 指挥部核心逻辑对象
     */
    const HQ_Engine = {
        init() {
            console.log(`%c > Yishen Global HQ Core Gate Activated: ${HQ_CORE.DEPLOY_STATUS} `, "background: #0ea5e3; color: #000; font-weight: bold;");
            this.initGlowEngine();      // 激活 GPU 微光追踪
            this.initNavSovereignty();  // 激活导航主权控制
            this.initUXPatches();       // 激活物理布局守护
            this.bindIntelMatrix();     // 绑定情报对撞路由
            window.YishenHQ = HQ_CORE;  // 挂载主权对象
        },

        // GPU 加速微光引擎
        initGlowEngine() {
            const glow = document.getElementById('cursor-glow');
            if (!glow) return;
            window.addEventListener('mousemove', (e) => {
                requestAnimationFrame(() => {
                    glow.style.left = `${e.clientX}px`;
                    glow.style.top = `${e.clientY}px`;
                });
            });
        },

        // 导航滚动主权
        initNavSovereignty() {
            const nav = document.getElementById('master-nav');
            if (!nav) return;
            window.addEventListener('scroll', () => {
                const isScrolled = window.scrollY > 50;
                nav.style.background = isScrolled ? "rgba(1, 4, 9, 0.98)" : "rgba(1, 4, 9, 0.95)";
                nav.style.height = isScrolled ? "70px" : "80px";
                nav.style.borderBottomColor = isScrolled ? "rgba(14, 165, 233, 0.2)" : "rgba(255, 255, 255, 0.08)";
            });
        },

        // 情报矩阵与社交路由
        bindIntelMatrix() {
            const intelMatrix = {
                Panju: "https://www.panjiva.com",
                Trademo: "https://www.trademo.com",
                LinkedIn: "https://www.linkedin.com/company/yishen-global",
                WhatsApp: "https://wa.me/8619530394133"
            };
            document.addEventListener('click', (e) => {
                const target = e.target.closest('[data-intel]') || e.target.closest('[data-connect]');
                if (!target) return;
                const node = target.getAttribute('data-intel') || target.getAttribute('data-connect');
                if (intelMatrix[node]) window.open(intelMatrix[node], '_blank');
            });
        },

        // 物理布局补丁：图片守护
        initUXPatches() {
            document.querySelectorAll("img").forEach(img => {
                if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
                img.addEventListener("error", () => { img.style.opacity = "0"; });
            });
            const style = document.createElement('style');
            style.innerHTML = `
                .site-logo svg { height: 32px !important; width: auto !important; overflow: visible !important; }
                @media (max-width: 768px) { .node-grid { grid-template-columns: 1fr !important; } }
            `;
            document.head.appendChild(style);
        }
    };

    /**
     * 04_TERMINAL_LOGIC: 终端反馈引擎 (实战交互模拟)
     */
    window.runAgent = function() {
        const input = document.getElementById('user-task');
        const output = document.getElementById('agent-output');
        if (!input || !output || !input.value) return;

        const mission = input.value.toUpperCase();
        output.innerHTML = `<span class="text-white">> INITIATING_MISSION_V4: [${mission}]</span>`;

        const logs = [
            `> SCANNING_TARGET_MATRIX: [${HQ_CORE.TARGET_MATRICES.RETAIL_GIANTS.join(", ")}]`,
            `> AUTHENTICATING_ROCKET_REACH_KEY: [CONNECTED]`,
            "> COLLIDING_REDDIT_SENTIMENT_ORACLE...",
            "> SUCCESS: OPERATIONAL_SYSTEM_STABLE_FOR_DEPLOYMENT."
        ];

        let i = 0;
        const interval = setInterval(() => {
            const div = document.createElement('div');
            div.className = "mt-1 opacity-70 font-mono text-[10px]";
            div.innerText = logs[i];
            output.appendChild(div);
            i++;
            if (i === logs.length) clearInterval(interval);
        }, 600);
    };

    /**
     * 05_SOVEREIGN_VALIDATION: 验证资产对齐
     */
    window.validateSovereignNode = (assetId) => {
        console.log(`> [HQ] COLLIDING_ASSET: ${assetId} WITH_HQ_CONFIG...`);
        return HQ_CORE.TARGET_MATRICES;
    };

    // 自动通电
    document.addEventListener('DOMContentLoaded', () => HQ_Engine.init());

})();
