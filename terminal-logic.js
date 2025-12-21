/**
 * YISHEN GLOBAL COMMAND TERMINAL LOGIC V5.0
 * 核心集成：[MARITIME_HARDWARE], [MEDICAL_PRECISION], [DUTY_HACK_ALGO]
 * 逻辑属性：UI Stability Sovereignty + AI Terminal Engine
 * 权限：Strategic Architecture Group / Yishen HQ (2026)
 */

// ==========================================
// 1. [PROTOCOL] 跨维度物理资产与 HS 智库映射
// ==========================================

const ASSET_CERT_MAP = {
    bifma: { url: "assets/docs/bifma-test-report.pdf", title: "BIFMA_STRUCTURAL_PROTOCOL_V5", sector: "OFFICE" },
    ul: { url: "assets/docs/ul-safety-cert.pdf", title: "UL_FIRE_SAFETY_VALIDATED", sector: "SAFETY" },
    ista: { url: "assets/docs/ista-6a-report.pdf", title: "ISTA_TRANSPORT_SURVIVABILITY", sector: "LOGISTICS" },
    en131: { url: "assets/docs/en131-ladder-cert.pdf", title: "EN131_LADDER_SAFETY_STANDARD", sector: "INFRA" },
    iso13485: { url: "assets/docs/iso13485-medical.pdf", title: "ISO_13485_MEDICAL_PRECISION", sector: "MEDICAL" },
    form_e: { url: "assets/docs/form-e-asean.pdf", title: "ASEAN_FORM_E_DUTY_EXEMPTION", sector: "GLOBAL_TRADE" }
};

const GLOBAL_HS_DB = [
    { code: "9402.1000", desc: "Medical Precision Seating - ISO 13485 Certified", market: "ASEAN/GLOBAL" },
    { code: "7315.8200", desc: "Marine Chains (G80/G100) - Brazil AD Exemption Ready", market: "LATAM" },
    { code: "7616.9910", desc: "Aluminum Ladders - US AD/CVD Offset Protocol", market: "NORTH_AMERICA" },
    { code: "9401.3100", desc: "Ergo Seating - BIFMA X5.1 Kinetic Matrix", market: "GLOBAL" },
    { code: "9403.1000", desc: "Dual-Motor Lifting Systems - UL 962 Logic", market: "EUROPE/NA" },
    { code: "4418.7500", desc: "Carbon-Negative Bamboo - CBAM Hedge Ready", market: "EUROPE" }
];

// ==========================================
// 2. [CORE] 主权终端扫描引擎
// ==========================================

class SovereignTerminal {
    constructor() {
        // UI 节点句柄
        this.barFill = document.getElementById('bar-fill');
        this.loadingScreen = document.getElementById('loading-screen');
        this.hsInput = document.getElementById('hs-input');
        this.hsResults = document.getElementById('hs-results');
        this.taskInput = document.getElementById('user-task');
        this.agentOutput = document.getElementById('agent-output');
        
        this.isProcessing = false;
        this.init();
    }

    init() {
        // 1. 启动序列监听
        window.addEventListener('load', () => this.executeBootSequence());
        
        // 2. HS Code 实时拦截
        if (this.hsInput) {
            this.hsInput.addEventListener('input', (e) => this.searchHSCode(e.target.value));
        }

        // 3. AI 任务指令执行
        if (this.taskInput) {
            this.taskInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.executeTask();
            });
        }

        // 4. 环境补丁
        this.initGlowEngine();
        this.applyFractureDefense();
    }

    // [PATCH] 模拟全球节点数据对撞启动
    executeBootSequence() {
        if (this.barFill) this.barFill.style.width = '100%';
        setTimeout(() => {
            if (this.loadingScreen) {
                this.loadingScreen.style.opacity = '0';
                setTimeout(() => { 
                    this.loadingScreen.style.display = 'none';
                    console.log("%c > YISHEN_V5_MASTER_COMMAND_LINK_ESTABLISHED ", "background: #0ea5e3; color: #000; font-weight: bold;");
                }, 700);
            }
        }, 2000);
    }

    // [PATCH] HS Code 智库实时检索
    searchHSCode(query) {
        if (!this.hsResults) return;
        if (!query) { this.hsResults.innerHTML = ''; return; }

        const q = query.toLowerCase();
        const filtered = GLOBAL_HS_DB.filter(i => i.code.includes(q) || i.desc.toLowerCase().includes(q));
        
        this.hsResults.innerHTML = filtered.map(i => `
            <div class="p-3 bg-white/5 border-b border-white/5 flex justify-between items-center hover:bg-[#0ea5e3]/10 transition-all group cursor-pointer" 
                 onclick="window.location.href='technical-passport.html?id=${i.code}'">
                <div class="flex flex-col">
                    <span class="text-[#0ea5e3] font-mono text-xs font-bold group-hover:tracking-widest transition-all">${i.code}</span>
                    <span class="text-[9px] text-gray-400 uppercase mt-1">${i.desc}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span class="text-[8px] font-mono text-gray-500 bg-white/5 px-2 py-1">${i.market}</span>
                    <i class="fas fa-chevron-right text-[10px] text-[#0ea5e3] opacity-0 group-hover:opacity-100"></i>
                </div>
            </div>
        `).join('') || `<div class="p-4 text-[10px] font-mono text-gray-600 italic">// NO_MATCH_IN_SOVEREIGN_DATABASE</div>`;
    }

    // [PATCH] AI 任务执行：模拟 RocketReach/Trademo 情报拦截
    async executeTask() {
        if (!this.taskInput.value || this.isProcessing) return;

        const cmd = this.taskInput.value.toUpperCase();
        this.isProcessing = true;
        this.agentOutput.innerHTML = `<span class="text-[#0ea5e3] animate-pulse">> INITIATING_V5_STRIKE: [${cmd}]</span>`;

        // 模拟指令流水线
        await this.delay(600);
        this.print("> PINGING_SANTOS_PORT_AUTHORITY... [SUCCESS]");
        await this.delay(800);
        this.print("> SCANNING_ASEAN_MEDICAL_CLUSTERS...");
        await this.delay(1000);
        this.print("> INTERCEPTING_COMPETITOR_BIM_MODEL...");
        
        await this.delay(1200);
        this.agentOutput.innerHTML = `
            <div class="mt-4 p-3 border-l-2 border-[#ffd700] bg-[#ffd700]/5">
                <div class="text-[#ffd700] font-bold text-[10px] mb-1">>> MISSION_RECAP: ${cmd}</div>
                <div class="text-gray-400 text-[9px] font-mono leading-relaxed">
                    TARGET: Global Sourcing VP [Interpreted]<br>
                    ACTION: Form E Duty-Free Protocol Dispatched<br>
                    STATUS: 24/7_AUTOMATION_STABLE<br>
                    RESULT: Market Friction Neutralized.
                </div>
            </div>
        `;
        
        this.isProcessing = false;
        this.taskInput.value = "";
    }

    // [PATCH] 技术护照资源预览
    previewResource(key) {
        const asset = ASSET_CERT_MAP[key];
        const modal = document.getElementById('asset-modal');
        const iframe = document.getElementById('preview-frame');
        
        if (asset && modal && iframe) {
            iframe.src = asset.url;
            document.getElementById('preview-title').innerText = `// TECHNICAL_PASSPORT: ${asset.title}`;
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // [PATCH] 图片碎裂守护逻辑
    applyFractureDefense() {
        document.querySelectorAll("img").forEach(img => {
            img.addEventListener("error", () => {
                img.src = 'assets/products/placeholder-node.webp';
                img.style.opacity = "0.5";
                img.classList.add('grayscale');
            });
        });
    }

    initGlowEngine() {
        const glow = document.getElementById('cursor-glow');
        if (!glow) return;
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                glow.style.left = `${e.clientX}px`;
                glow.style.top = `${e.clientY}px`;
            });
        });
    }

    print(msg) {
        const div = document.createElement('div');
        div.className = 'mt-1 opacity-60 font-mono text-[9px] text-white';
        div.innerText = msg;
        this.agentOutput.appendChild(div);
        this.agentOutput.scrollTop = this.agentOutput.scrollHeight;
    }

    delay(ms) { return new Promise(res => setTimeout(res, ms)); }
}

// ==========================================
// 3. [EXPOSURE] 实例化与全局接口绑定
// ==========================================

const TerminalEngine = new SovereignTerminal();

window.previewResource = (key) => TerminalEngine.previewResource(key);
window.closePreview = () => {
    const modal = document.getElementById('asset-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
        document.getElementById('preview-frame').src = '';
        document.body.style.overflow = 'auto';
    }
};
window.runAgent = () => TerminalEngine.executeTask();

/**
 * [UTILITY] 伸缩菜单对撞逻辑
 */
window.toggleSpringMenu = function(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const isExpanded = el.style.maxHeight !== '0px' && el.style.maxHeight !== '';
    
    // 关闭其他同级菜单 (Accordion 效果)
    if (!isExpanded) {
        document.querySelectorAll('.accordion-content').forEach(menu => {
            menu.style.maxHeight = '0px';
        });
        el.style.maxHeight = el.scrollHeight + "px";
    } else {
        el.style.maxHeight = "0px";
    }
};
