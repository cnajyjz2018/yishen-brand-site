/* =========================================================
   YiShen Global — Master Logic Script
   System Version: 2026.FINAL.MASTER
   Purpose: UI Interaction Sovereignty + AI Terminal Engine
   ========================================================= */

/**
 * 1. 核心交互：弹簧式伸缩菜单 (UI Stability Sovereignty)
 */
function toggleSpringMenu(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const isExpanded = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';
    
    if (!isExpanded) {
        document.querySelectorAll('.accordion-content').forEach(menu => {
            menu.style.maxHeight = '0px';
        });
        el.style.maxHeight = el.scrollHeight + "px";
    } else {
        el.style.maxHeight = "0px";
    }
}

/**
 * 2. 手机端子菜单增强补丁
 */
function toggleSubMenu(id) {
    const el = document.getElementById(id);
    const parent = document.getElementById('mobile-drawer'); 
    if (!el) return;

    const isExpanded = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';
    el.style.maxHeight = isExpanded ? '0px' : el.scrollHeight + "px";

    if (parent && !isExpanded) {
        setTimeout(() => { parent.style.maxHeight = 'none'; }, 10);
    }
}

/**
 * 3. Yishen AI Terminal Engine (Sovereign Task Execution)
 * 集成：Reddit 舆情对撞 & RocketReach API 握手逻辑
 */
class TerminalEngine {
    constructor() {
        this.input = document.getElementById('user-task');
        this.output = document.getElementById('agent-output');
        this.config = window.YishenHQ || {}; // 对接核心逻辑门
        this.isProcessing = false;
    }

    async execute() {
        if (!this.input || !this.input.value || this.isProcessing) return;

        const command = this.input.value.toUpperCase();
        this.isProcessing = true;
        this.output.innerHTML = `<span class="text-white">> INITIATING_MISSION: ${command}</span>`;

        // 模拟数字化打击链路
        await this.delay(600);
        this.print("> ACCESSING_HQ_CORE_GATE: SUCCESS.");
        
        await this.delay(800);
        const targets = this.config.TARGET_MATRICES ? this.config.TARGET_MATRICES.RETAIL_GIANTS.join(', ') : "OFFICE_DEPOT, ASHLEY, LOWES";
        this.print(`> TARGET_NODES: ${targets}`);

        await this.delay(1000);
        this.simulateCollision(command);
    }

    async simulateCollision(cmd) {
        this.print("> SCANNING_REDDIT_SENTIMENT_ORACLE...");
        await this.delay(1200);
        this.print("> STATUS: #Lumbar_Support_Failure TREND DETECTED.");
        
        await this.delay(800);
        this.print("> CORRELATING_ROCKETREACH_API_KEY...");
        const apiKey = this.config.INTEL_FIREWALL ? this.config.INTEL_FIREWALL.ROCKET_REACH_KEY : "1a174fbk...";
        this.print(`> NODE: ${apiKey.substring(0, 8)}... [LOCKED]`);

        await this.delay(1500);
        this.output.innerHTML = `
            <div class="text-[#0ea5e3] border-l-2 border-[#0ea5e3] pl-4 mt-4 animate-pulse font-mono text-[10px]">
                > MISSION_STATUS: DEPLOYED_SUCCESSFULLY<br>
                > TARGET: VP_GLOBAL_SOURCING (Fortune 500)<br>
                > ACTION: TECHNICAL_PASSPORT_DELIVERED<br>
                > RESULT: SOVEREIGN_CREDIT_ESTABLISHED
            </div>
        `;
        
        this.isProcessing = false;
        this.input.value = "";
    }

    print(msg) {
        const div = document.createElement('div');
        div.className = 'mt-1 opacity-70 font-mono text-[9px]';
        div.innerText = msg;
        this.output.appendChild(div);
        this.output.scrollTop = this.output.scrollHeight;
    }

    delay(ms) { return new Promise(res => setTimeout(res, ms)); }
}

/**
 * 4. 自动初始化与系统守卫
 */
let agent;

document.addEventListener("DOMContentLoaded", () => {
    // A. 终端引擎初始化
    agent = new TerminalEngine();
    if (agent.input) {
        agent.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') agent.execute();
        });
    }

    // B. 导航交互守卫
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu   = document.querySelector(".nav-menu");
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("open");
        });
    }

    // C. 物理点击脱敏 (Click Outside to Close)
    document.addEventListener("click", (e) => {
        if (!e.target.closest('#master-nav') && !e.target.closest('.accordion-content')) {
            document.querySelectorAll('.accordion-content').forEach(menu => {
                menu.style.maxHeight = '0px';
            });
        }
    });

    // D. 碎图防御补丁 (Image Load Guard)
    document.querySelectorAll("img").forEach(img => {
        if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
        img.addEventListener("error", () => {
            img.style.display = "none"; // 物理清除破损节点
        });
    });

    // E. 主权状态高亮
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute("href") && currentPath.includes(link.getAttribute("href"))) {
            link.classList.add("active");
        }
    });

    console.log("%c > YISHEN_CORE_SYSTEM_LOADED: NO_VARIABLES_DETECTED ", "background: #A11219; color: #fff; font-weight: bold;");
});

// 暴露全局部署接口
window.runAgent = () => agent.execute();
