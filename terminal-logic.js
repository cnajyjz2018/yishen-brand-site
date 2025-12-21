/**
 * YISHEN GLOBAL COMMAND TERMINAL LOGIC V5.0
 * 核心补丁：[MARITIME_HARDWARE_SYNC], [DUTY_HACK_ALGO], [CROSS_PLATFORM_COLLISION]
 * 集成逻辑：UI Stability Sovereignty + AI Terminal Engine
 */

// ==========================================
// 1. [PROTOCOL] 物理资产与 HS 智库映射
// ==========================================

const ASSET_CERT_MAP = {
    bifma: { url: "assets/docs/bifma.pdf", title: "BIFMA_STRUCTURAL_PROTOCOL_V5", icon: "assets/icons/bifma-badge.webp" },
    ul: { url: "assets/docs/ul.pdf", title: "UL_FIRE_SAFETY_VALIDATED", icon: "assets/icons/logo-ul.webp" },
    ista: { url: "assets/docs/ista.pdf", title: "ISTA_TRANSPORT_SURVIVABILITY", icon: "assets/icons/ista-badge.webp" },
    en131: { url: "assets/docs/en131.pdf", title: "EN131_LADDER_SAFETY_STANDARD", icon: "assets/icons/en131-badge.webp" },
    iso9001: { url: "assets/docs/iso9001.pdf", title: "ISO_9001_QUALITY_SOVEREIGNTY", icon: "assets/icons/iso9001.webp" }
};

const GLOBAL_HS_DB = [
    { code: "7315.8200", desc: "Marine Chains (G80/G100) - Brazil Exemption Ready", market: "LATAM" },
    { code: "7312.1000", desc: "Steel Wire Ropes & Rigging - Houston Port Sync", market: "NORTH_AMERICA" },
    { code: "7616.9910", desc: "Aluminum Ladders - US AD/CVD Offset Protocol", market: "NORTH_AMERICA" },
    { code: "9401.3100", desc: "Mesh & Ergo Seating - BIFMA X5.1 Protocol", market: "GLOBAL" },
    { code: "9401.4000", desc: "Sleeper Sofas & Compressed Seating - DTC Optimized", market: "GLOBAL" }
];

// ==========================================
// 2. [CORE] 主权终端扫描引擎
// ==========================================

class SovereignTerminal {
    constructor() {
        this.barFill = document.getElementById('bar-fill');
        this.loadingScreen = document.getElementById('loading-screen');
        this.hsInput = document.getElementById('hs-input');
        this.hsResults = document.getElementById('hs-results');
        
        // AI 终端属性
        this.taskInput = document.getElementById('user-task');
        this.agentOutput = document.getElementById('agent-output');
        this.isProcessing = false;
        
        this.init();
    }

    init() {
        window.addEventListener('load', () => this.executeBootSequence());
        
        // HS 搜索监听
        if (this.hsInput) {
            this.hsInput.addEventListener('keyup', (e) => this.searchHSCode(e.target.value));
        }

        // AI 任务监听
        if (this.taskInput) {
            this.taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.executeTask();
            });
        }

        this.initGlowEngine();
        this.applyImageProtection();
    }

    // [PATCH] 启动序列：模拟全球数据对撞
    executeBootSequence() {
        if (this.barFill) this.barFill.style.width = '100%';
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.style.opacity = '0';
                setTimeout(() => { 
                    this.loadingScreen.style.display = 'none';
                    console.log("%c > YISHEN_CORE_SYSTEM_V5_ONLINE ", "background: #0ea5e3; color: #000; font-weight: bold;");
                }, 700);
            }
        }, 2500);
    }

    // [PATCH] HS Code 智能拦截逻辑
    searchHSCode(query) {
        if (!this.hsResults) return;
        const q = query.toLowerCase();
        const filtered = GLOBAL_HS_DB.filter(i => i.code.includes(q) || i.desc.toLowerCase().includes(q));
        
        this.hsResults.innerHTML = filtered.map(i => `
            <div class="p-3 bg-white/5 border border-white/5 flex justify-between items-center hover:bg-white/10 transition group cursor-pointer" 
                 onclick="window.location.href='technical-passport.html?id=${i.code}'">
                <div class="flex flex-col">
                    <span class="text-[#0ea5e3] font-mono text-xs font-bold group-hover:tracking-widest transition-all">${i.code}</span>
                    <span class="text-[9px] text-gray-500 uppercase mt-1">${i.desc}</span>
                </div>
                <span class="text-[8px] font-mono text-gray-600 bg-white/5 px-2 py-1">${i.market}</span>
            </div>
        `).join('') || `<div class="text-[10px] font-mono text-gray-700 p-4 border border-dashed border-white/10">// NO_RECORDS_IN_SOVEREIGN_DATABASE</div>`;
    }

    // [PATCH] AI 任务执行：模拟 RocketReach & Reddit 对撞
    async executeTask() {
        if (!this.taskInput || !this.taskInput.value || this.isProcessing) return;

        const cmd = this.taskInput.value.toUpperCase();
        this.isProcessing = true;
        this.agentOutput.innerHTML = `<span class="text-white animate-pulse">> INITIATING_MISSION: ${cmd}</span>`;

        await this.delay(800);
        this.print("> ACCESSING_HQ_CORE_GATE: SUCCESS.");
        
        await this.delay(1000);
        this.print("> SCANNING_REDDIT_SENTIMENT_ORACLE...");
        
        await this.delay(1200);
        this.print("> STATUS: #DUMPING_DUTY_FRICTION DETECTED IN SANTOS_PORT.");

        await this.delay(1500);
        this.agentOutput.innerHTML = `
            <div class="text-[#0ea5e3] border-l-2 border-[#0ea5e3] pl-4 mt-4 font-mono text-[10px]">
                > MISSION_STATUS: DEPLOYED_SUCCESSFULLY<br>
                > TARGET: VP_PROCUREMENT_LATAM<br>
                > ACTION: BRAZIL_EXEMPTION_PROTOCOL_SENT<br>
                > RESULT: SOVEREIGN_INTERCEPTION_ACTIVE
            </div>
        `;
        
        this.isProcessing = false;
        this.taskInput.value = "";
    }

    // [PATCH] UI 交互与主权护卫
    previewResource(key) {
        const asset = ASSET_CERT_MAP[key];
        const modal = document.getElementById('asset-modal');
        const iframe = document.getElementById('preview-frame');
        if (asset && modal && iframe) {
            iframe.src = asset.url;
            document.getElementById('preview-title').innerText = `// SOURCE: ${asset.title}`;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    applyImageProtection() {
        document.querySelectorAll("img").forEach(img => {
            img.addEventListener("error", () => { img.style.display = "none"; });
        });
    }

    initGlowEngine() {
        const glow = document.getElementById('cursor-glow');
        if (!glow) return;
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            });
        });
    }

    print(msg) {
        const div = document.createElement('div');
        div.className = 'mt-1 opacity-70 font-mono text-[9px]';
        div.innerText = msg;
        this.agentOutput.appendChild(div);
        this.agentOutput.scrollTop = this.agentOutput.scrollHeight;
    }

    delay(ms) { return new Promise(res => setTimeout(res, ms)); }
}

// [INITIALIZE] 实例化指挥控制层
const Terminal = new SovereignTerminal();

// 暴露全局接口
window.previewResource = (key) => Terminal.previewResource(key);
window.closePreview = () => {
    document.getElementById('asset-modal').classList.add('hidden');
    document.getElementById('preview-frame').src = '';
    document.body.style.overflow = 'auto';
};
window.runAgent = () => Terminal.executeTask();

/**
 * 3. 伸缩菜单与导航逻辑
 */
function toggleSpringMenu(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const isExpanded = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';
    el.style.maxHeight = isExpanded ? '0px' : el.scrollHeight + "px";
}
