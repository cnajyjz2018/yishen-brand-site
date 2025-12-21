/**
 * YISHEN_GLOBAL_ASSET_DISTRIBUTOR V5.0.INTEGRATED
 * 核心补丁：[SKU_RENDER], [DATABASE_COLLISION], [FRACTURE_DEFENSE], [SOVEREIGN_MAPPING]
 * 功能：自动从 asset-ledger.json 抓取物理主权资产并映射至 UI 集群
 */

class AssetDistributor {
    constructor() {
        // 1. 物理路径定义 (匹配物理仓库与 Vercel 缓存协议)
        this.ledgerPath = './asset-ledger.json';
        this.defaultThumb = 'assets/system/node-active-stub.webp';
        
        // 2. 自动识别 UI 容器：兼容 industries.html (sku-container) 与 matrix.html
        this.container = document.getElementById('sku-container') || document.getElementById('dynamic-sku-grid');
        
        // 3. 数字化孪生 Base64 兜底图 (解决 404 碎图导致的视觉主权受损)
        this.fallbackSVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMjUiIGZpbGw9IiMwMTA0MDkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZmlsbD0iIzBlYTVlMyIgZm9udC1mYW1pbHk9Ik1vbm8iIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPltESUdJVEFMX1RXSU5fQUNUSVZFXTwvdGV4dD48L3N2Zz4=';

        this.startTime = Date.now();
        this.boot();
    }

    /**
     * 启动分发引擎：执行数据库对撞
     */
    async boot() {
        if (!this.container) {
            console.warn("> [SYSTEM] No distribution target found in DOM. Monitoring mode only.");
            return;
        }

        try {
            console.log("> [SYSTEM] Initiating Sovereign Ledger Sync...");
            const response = await fetch(this.ledgerPath);
            
            if (!response.ok) throw new Error(`HTTP_STATUS_${response.status}`);
            
            const data = await response.json();
            // 兼容两种数据格式：直接数组或嵌套在 skus 键下
            const assetList = data.skus || Object.values(data);

            this.renderMatrix(assetList);
            
            const duration = Date.now() - this.startTime;
            console.log(`%c >> [SYSTEM_V5]: ASSET_COLLISION_SUCCESS | ${assetList.length} Nodes Manifested in ${duration}ms `, "background: #0ea5e3; color: #000; font-weight: bold;");
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * 执行物理渲染：生成具备主权压制力的 UI 卡片
     * @param {Array} assetList 
     */
    renderMatrix(assetList) {
        this.container.innerHTML = assetList.map(asset => {
            // 安全处理描述文本，保留前瞻叙事感
            const shortDesc = asset.tagline || (asset.desc ? asset.desc.substring(0, 80) + '...' : 'Retrieving specifications...');
            const imagePath = asset.image || asset.thumbnail || this.defaultThumb;
            
            return `
                <div class="asset-node rounded-2xl group border border-white/5 bg-white/[0.02] hover:border-[#0ea5e3]/30 transition-all duration-500 p-8 cursor-pointer" 
                     onclick="window.location.href='technical-passport.html?id=${asset.id}'">
                    
                    <div class="scan-line"></div>
                    
                    <div class="mb-6 overflow-hidden bg-black aspect-video flex items-center justify-center border border-white/5 relative rounded-lg">
                        <img src="${imagePath}" 
                             alt="${asset.title}" 
                             class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                             onerror="this.src='${this.fallbackSVG}'">
                    </div>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="font-mono text-[9px] text-[#0ea5e3] tracking-[3px] uppercase">// ${asset.sector || asset.category || 'GENERAL_ASSET'}</span>
                            <span class="text-[10px] font-mono text-[#ffd700] border border-[#ffd700]/30 px-2 py-0.5">${asset.hs_code || 'HS_PENDING'}</span>
                        </div>
                        
                        <h3 class="text-xl font-black italic uppercase text-white group-hover:text-[#0ea5e3] transition-colors leading-tight">
                            ${asset.title || asset.name}
                        </h3>
                        
                        <div class="space-y-2 py-4 border-y border-white/5">
                            ${asset.specs ? Object.entries(asset.specs).slice(0, 2).map(([key, val]) => `
                                <div class="flex justify-between font-mono text-[8px]">
                                    <span class="text-gray-600 uppercase">${key}</span>
                                    <span class="text-gray-400">${val}</span>
                                </div>
                            `).join('') : '<span class="text-[8px] text-gray-700 uppercase italic">Awaiting_Specs_Validation</span>'}
                        </div>

                        <div class="flex justify-between items-center pt-2">
                            <div class="flex gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                                ${asset.compliance ? asset.compliance.map(cert => `
                                    <img src="assets/icons/${cert.toLowerCase()}-badge.webp" class="h-4" onerror="this.style.display='none'">
                                `).join('') : ''}
                            </div>
                            <span class="flex items-center gap-1.5 font-mono text-[8px] text-gray-700">
                                <span class="w-1.5 h-1.5 bg-[#A11219] rounded-full animate-pulse"></span>
                                VALIDATED
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * 致命错误防御逻辑
     */
    handleError(err) {
        console.error("> [FATAL_ERROR] Sovereign Sync Failed:", err);
        if (this.container) {
            this.container.innerHTML = `
                <div class="col-span-full py-32 text-center bg-white/[0.01] border border-dashed border-[#A11219]/30 rounded-3xl">
                    <span class="font-mono text-[#A11219] uppercase tracking-[5px] animate-pulse block mb-4">
                        [FATAL_ERROR]: ASSET_SYNCHRONIZATION_INTERRUPTED
                    </span>
                    <p class="text-[10px] text-gray-600 font-mono italic">>> INITIATING_EMERGENCY_RECOVERY_PROTOCOL_V5...</p>
                </div>
            `;
        }
    }
}

// [INITIALIZE] 启动分发引擎
document.addEventListener('DOMContentLoaded', () => {
    window.YishenDistributor = new AssetDistributor();
});
