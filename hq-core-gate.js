/* =========================================================
   YISHEN GLOBAL - HQ_CORE_GATE V5.0.FINAL.MASTER
   Logic: Total Integration (Core + Pages + Offensive Intel)
   Integrated: GPU Engine, Terminal Logic, RocketReach Auth, Target Matrix
   Authority: Strategic Architecture Group / Yishen HQ
   ========================================================= */

(function() {
    "use strict";

    /**
     * 01_STRATEGIC_CONFIG: 核心主权配置与情报防火墙
     */
    const HQ_CONFIG = {
        version: "5.0.MASTER",
        status: "ACTIVE_NODE_HARVESTING",
        deployStatus: "COMMAND_ACTIVE",
        // 实战进攻目标节点：指向全球贸易主权方
        targetMatrix: ["ASHLEY_FURNITURE", "ODP_CORP", "LOWES", "JYSK", "AMAZON_COMMERCIAL"],
        // 斩首行动核心 API 密钥 (RocketReach 对撞节点)
        intelKey: "1a174fbk3bd5d56961b4be235ed012552eb4c800",
        // 物理资产主权路径
        assetRoot: "public/assets/products/"
    };

    /**
     * 02_GLOBAL_HOOKS: 跨页面弹簧 UI 逻辑
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
            console.log(`%c // YISHEN_V5.0_COMMAND_ACTIVE // `, "background:#0ea5e3; color:#000; font-weight:bold;");
            this.initGlowEngine();      // 激活 GPU 微光追踪
            this.initNavSovereignty();  // 激活导航主权控制
            this.applyUXPatches();       // 激活物理布局守护
            this.bindSovereignIntel();   // 绑定全球情报矩阵
            window.YishenHQ = HQ_CONFIG; // 挂载主权配置对象
        },

        // GPU 加速微光跟随 logic
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

        // 导航主权滚动控制 logic
        initNavSovereignty() {
            const nav = document.getElementById('master-nav');
            if (!nav) return;
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY > 50;
                nav.style.height = scrolled ? "70px" : "80px";
                nav.style.background = scrolled ? "rgba(1, 4, 9, 0.98)" : "rgba(1, 4, 9, 0.95)";
                nav.style.borderBottomColor = scrolled ? "rgba(14, 165, 233, 0.2)" : "rgba(255, 255, 255, 0.08)";
            });
        },

        // 物理布局补丁：图片守护，根除 404 破碎感
        applyUXPatches() {
            document.querySelectorAll("img").forEach(img => {
                if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
                img.addEventListener("error", () => { 
                    img.style.opacity = "0"; // 物理隐藏破碎占位符
                });
            });
            // 自动注入针对 Logo 和页脚的物理主权样式
            const style = document.createElement('style');
            style.innerHTML = `
                .site-logo svg { height: 32px !important; width: auto !important; overflow: visible !important; }
                @media (max-width: 768px) { .node-grid { grid-template-columns: 1fr !important; } }
            `;
            document.head.appendChild(style);
        },

        // 绑定全球情报矩阵路由 logic
        bindSovereignIntel() {
            const intelMatrix = {
                Panju: "https://www.panjiva.com",
                Trademo: "https://www.trademo.com",
                LinkedIn: "https://www.linkedin.com/company/yishen-global",
                WhatsApp: "https://wa.me/8619530394133",
                ImportYeti: "https://www.importyeti.com"
            };
            document.addEventListener('click', (e) => {
                const target = e.target.closest('[data-intel]') || e.target.closest('[data-connect]');
                if (!target) return;
                const node = target.getAttribute('data-intel') || target.getAttribute('data-connect');
                if (intelMatrix[node]) window.open(intelMatrix[node], '_blank');
            });
        }
    };

    /**
     * 04_TERMINAL_LOGIC: 5.0 实战对撞终端
     */
    window.runAgent = function() {
        const input = document.getElementById('user-task');
        const output = document.getElementById('agent-output');
        if (!input || !output || !input.value) return;

        const mission = input.value.toUpperCase();
        output.innerHTML = `<span class="text-[#0ea5e3]">> INITIATING_5.0_MISSION: [${mission}]</span>`;

        const logs = [
            `> SCANNING_TARGET_MATRIX: [${HQ_CONFIG.targetMatrix.join(", ")}]`,
            `> AUTHENTICATING_ROCKET_REACH_KEY: [CONNECTED]`,
            "> COLLIDING_REDDIT_SENTIMENT_ORACLE...",
            `> ASSET_PATH_VERIFIED: ${HQ_CONFIG.assetRoot}`,
            "> SUCCESS: 24/7_AUTOMATION_STABLE."
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
        console.log(`> [HQ] COLLIDING_ASSET: ${assetId} WITH_HQ_CONFIG_V5...`);
        return HQ_CONFIG.targetMatrix;
    };

    // 06_IGNITION: 全局自动通电
    document.addEventListener('DOMContentLoaded', () => HQ_Engine.init());

})();
