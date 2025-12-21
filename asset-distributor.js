/**
 * YISHEN_GLOBAL_ASSET_DISTRIBUTOR V4.0.FINAL
 * Logic: Atomically fetch from asset-ledger and manifest onto UI clusters.
 * Authority: Master Distributor for Industries and Sovereign Matrix.
 */

class AssetDistributor {
    constructor() {
        // 统一对接升维后的主权资产账本
        this.ledgerPath = './asset-ledger.json';
        
        // 自动识别容器：兼容 industries.html (sku-container) 和其他页面
        this.container = document.getElementById('sku-container') || document.getElementById('dynamic-sku-grid');
        
        // 性能监控：记录节点对撞耗时
        this.startTime = Date.now();
    }

    /**
     * 启动分发引擎
     */
    async boot() {
        if (!this.container) {
            console.warn("> [SYSTEM] No distribution target found in DOM. Skipping render.");
            return;
        }

        try {
            console.log("> [SYSTEM] Initiating Asset Ledger Sync...");
            const response = await fetch(this.ledgerPath);
            
            if (!response.ok) throw new Error(`HTTP_STATUS_${response.status}`);
            
            const assets = await response.json();
            const assetList = Object.values(assets);

            this.render(assetList);
            
            const duration = Date.now() - this.startTime;
            console.log(`> [SYSTEM] Distribution Complete: ${assetList.length} Nodes Manifested in ${duration}ms.`);
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * 执行物理渲染：生成具备主权压制力的 UI 卡片
     * @param {Array} assetList 
     */
    render(assetList) {
        this.container.innerHTML = assetList.map(asset => {
            // 安全处理描述文本，保留前瞻叙事感
            const shortDesc = asset.tagline || (asset.desc ? asset.desc.substring(0, 60) + '...' : 'Retrieving specifications...');
            
            return `
                <div class="sku-card p-8 group cursor-pointer border border-white/5 bg-white/[0.02] hover:border-[#0ea5e3]/30 transition-all duration-500" 
                     onclick="window.location.href='technical-passport.html?id=${asset.id}'">
                    
                    <div class="mb-6 overflow-hidden bg-black aspect-square flex items-center justify-center border border-white/5 relative">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                        <img src="${asset.image || asset.img}" 
                             alt="${asset.title}" 
                             class="w-4/5 h-4/5 object-contain grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 z-0">
                    </div>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="font-mono text-[9px] text-[#0ea5e3] tracking-[3px] uppercase">${asset.sector || asset.category}</span>
                            <span class="text-[8px] font-mono text-gray-700">V4.0_SECURE</span>
                        </div>
                        
                        <h3 class="text-xl font-black italic uppercase text-white group-hover:text-[#0ea5e3] transition-colors leading-tight">
                            ${asset.title || asset.name}
                        </h3>
                        
                        <p class="text-xs text-gray-500 font-inter leading-relaxed">
                            ${shortDesc}
                        </p>

                        <div class="flex justify-between font-mono text-[9px] text-gray-600 border-t border-white/5 pt-4 group-hover:border-[#0ea5e3]/20">
                            <span>HS: ${asset.hs_code || 'N/A'}</span>
                            <span class="flex items-center gap-1.5">
                                <span class="w-1.5 h-1.5 bg-[#A11219] rounded-full animate-pulse"></span>
                                VALIDATED_NODE
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * 错误防御逻辑
     */
    handleError(err) {
        console.error("> [SYSTEM_ERROR] Ledger Sync Failed:", err);
        if (this.container) {
            this.container.innerHTML = `
                <div class="col-span-full py-20 text-center font-mono text-[#A11219] uppercase tracking-widest bg-white/[0.02] border border-[#A11219]/20">
                    > Ledger_Sync_Failure: Access Denied or Missing Assets.
                </div>
            `;
        }
    }
}

// 自动初始化全站分发
document.addEventListener('DOMContentLoaded', () => {
    const engine = new AssetDistributor();
    engine.boot();
});
