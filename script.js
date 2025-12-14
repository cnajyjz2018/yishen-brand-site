/* =========================================================================
   YiShen Global B2B - script.js
   最终权威版脚本 (Tri-Channel Fusion 20 SKU 架构)
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Elements ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const stickyCta = document.getElementById('stickyCta');
    const showcaseImage = document.getElementById('mesh-chair-showcase');
    const meshSkuContainer = document.getElementById('mesh-sku-container');
    const priceFilter = document.getElementById('filter-price');
    const lumberFilter = document.getElementById('filter-lumber');
    const bifmaFilter = document.getElementById('filter-bifma');
    const resetButton = document.getElementById('reset-filters');
    const noResultsMessage = document.getElementById('no-results-message');

    // --- 战略核心：20个 SKU 的数据模型 (已集成 Tri-Channel 营销信号) ---
    // signals: { retail, dtc, enterprise } 用于决定 SKU 卡片上的营销标签
    const ALL_MESH_CHAIR_SKUS = [
        // YS-001: 经济型 - 高批量
        { 
            model: 'YS-001', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Fixed lumbar, High volume SKU. FCL: 750 units.', img: 'mesh-ys001-sku1.jpg',
            signals: { retail: 'BIFMA-PASS', dtc: '72H-Ship', enterprise: 'High-Vol-Cap' }
        }, 
        // YS-003: 经济型 - 预算优化
        { 
            model: 'YS-003', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: '1-Year warranty, Cost-optimized design.', img: 'mesh-sku4.jpg',
            signals: { retail: 'Cost-Down', dtc: 'Fast-Assemble', enterprise: 'Basic-Project' }
        }, 
        // YS-010: 经济型 - 快速周转
        { 
            model: 'YS-010', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Entry-level mesh, basic tilt mechanism. Quick inventory turnover.', img: 'mesh-sku7.jpg',
            signals: { retail: 'Quick-Turnover', dtc: 'Simple-SKU', enterprise: 'Bulk-Discount' }
        }, 
        // YS-012: 经济型 - 简易DTC
        { 
            model: 'YS-012', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Fixed arms and headrest. Simplest assembly for DTC.', img: 'mesh-sku8.jpg',
            signals: { retail: 'Fixed-Price', dtc: 'Ease-of-Use', enterprise: 'Low-Spec' }
        }, 
        // YS-015: 经济型 - 2D价值
        { 
            model: 'YS-015', tier: 'economic', lumbar: '2d', bifma: 'bifma', 
            desc: 'Economic with essential 2D adjustable armrests. Value leader.', img: 'mesh-sku9.jpg',
            signals: { retail: '2D-Value', dtc: 'Adjustable-Arms', enterprise: 'Cost-Upgrade' }
        }, 
        // YS-002: 标准型 - 中端稳定
        { 
            model: 'YS-002', tier: 'standard', lumbar: '2d', bifma: 'bifma', 
            desc: '2D adjustable lumbar/armrests, High mesh content. Mid-market stable.', img: 'mesh-ys002-sku2.jpg',
            signals: { retail: 'Spare-Stock-Ready', dtc: 'Low-Damage-Pack', enterprise: 'BIFMA-PLUS' }
        }, 
        // YS-005: 标准型 - 动态舒适
        { 
            model: 'YS-005', tier: 'standard', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'Dynamic lumbar support, Standard tier mesh. High user comfort rating.', img: 'mesh-sku5.jpg',
            signals: { retail: 'Factory-Audited', dtc: 'Quick-Iteration', enterprise: 'ESG-Ready' }
        }, 
        // YS-020: 标准型 - 同步倾仰
        { 
            model: 'YS-020', tier: 'standard', lumbar: '2d', bifma: 'bifma', 
            desc: 'Synchronous tilt mechanism, nylon base, popular standard model.', img: 'mesh-sku10.jpg',
            signals: { retail: 'Synchro-Tilt', dtc: 'Easy-Custom', enterprise: 'Standard-Reliable' }
        }, 
        // YS-025: 标准型 - 尺寸优化
        { 
            model: 'YS-025', tier: 'standard', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'Dynamic lumbar, medium back height. Optimized for small/medium users.', img: 'mesh-sku11.jpg',
            signals: { retail: 'Size-Optimization', dtc: 'Mid-Tier-Perf', enterprise: 'Dynamic-Proj' }
        }, 
        // YS-030: 标准型 - 固定腰部
        { 
            model: 'YS-030', tier: 'standard', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Standard mesh, fixed lumbar, with adjustable headrest. Cost-effective ergonomics.', img: 'mesh-sku12.jpg',
            signals: { retail: 'Adj-Headrest', dtc: 'Aesthetic-Clean', enterprise: 'Standard-Ergo' }
        }, 
        // YS-035: 标准型 - UL安全
        { 
            model: 'YS-035', tier: 'standard', lumbar: '2d', bifma: 'ul', 
            desc: 'Standard tier, but with UL certified components for enhanced safety compliance.', img: 'mesh-sku13.jpg',
            signals: { retail: 'UL-Certified', dtc: 'Safety-First', enterprise: 'Proj-Compliance' }
        }, 
        // YS-040: 标准型 - 商业认证
        { 
            model: 'YS-040', tier: 'standard', lumbar: 'fixed', bifma: 'ul', 
            desc: 'High-back mesh, fixed lumbar, certified for commercial projects.', img: 'mesh-sku14.jpg',
            signals: { retail: 'Commercial-Grade', dtc: 'High-Back', enterprise: 'Contract-Ready' }
        }, 
        // YS-007: 旗舰型 - 旗舰稳定
        { 
            model: 'YS-007', tier: 'premium', lumbar: 'dynamic', bifma: 'ul', 
            desc: 'Dynamic lumbar, Aluminum base, UL Certified. Flagship stability.', img: 'mesh-ys007-sku3.jpg',
            signals: { retail: 'UL-Comp', dtc: 'Modular-Design', enterprise: 'Digital-Twin' }
        }, 
        // YS-009: 旗舰型 - 5年质保
        { 
            model: 'YS-009', tier: 'premium', lumbar: 'dynamic', bifma: 'ul', 
            desc: 'Full adjustable headrest, 5-Year warranty. Executive comfort.', img: 'mesh-sku6.jpg',
            signals: { retail: '5-Year-Warranty', dtc: 'Aesthetic-Premium', enterprise: 'Project-Tier-A' }
        }, 
        // YS-050: 旗舰型 - 4D控制
        { 
            model: 'YS-050', tier: 'premium', lumbar: 'dynamic', bifma: 'ul', 
            desc: '4D armrests, advanced wire control mechanism. Highest durability rating.', img: 'mesh-sku15.jpg',
            signals: { retail: '4D-Armrests', dtc: 'Wire-Control', enterprise: 'Highest-Durability' }
        }, 
        // YS-055: 旗舰型 - 透气寿命
        { 
            model: 'YS-055', tier: 'premium', lumbar: '2d', bifma: 'ul', 
            desc: 'Premium mesh, 2D lumbar. Focus on material breathability and lifespan.', img: 'mesh-sku16.jpg',
            signals: { retail: 'Breathable-Mesh', dtc: 'Long-Lifespan', enterprise: 'Material-Cert' }
        }, 
        // YS-060: 旗舰型 - 设计优先
        { 
            model: 'YS-060', tier: 'premium', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'Dynamic lumbar, polished aluminum base. Design-first premium model.', img: 'mesh-sku17.jpg',
            signals: { retail: 'Design-First', dtc: 'Aesthetic-Focus', enterprise: 'Premium-Finish' }
        }, 
        // YS-065: 旗舰型 - 水瀑布边
        { 
            model: 'YS-065', tier: 'premium', lumbar: '2d', bifma: 'bifma', 
            desc: 'Adjustable headrest, waterfall seat edge. High-spec comfort.', img: 'mesh-sku18.jpg',
            signals: { retail: 'Waterfall-Edge', dtc: 'High-Spec', enterprise: 'Ergo-Max' }
        },
        // YS-070: 旗舰型 - 简洁行政
        { 
            model: 'YS-070', tier: 'premium', lumbar: 'fixed', bifma: 'ul', 
            desc: 'Executive style, simplified fixed lumbar for clean aesthetic. UL Certified.', img: 'mesh-sku19.jpg',
            signals: { retail: 'Executive-Style', dtc: 'Clean-Aesthetic', enterprise: 'Fixed-Luxury' }
        },
        // YS-075: 旗舰型 - 动态运动
        { 
            model: 'YS-075', tier: 'premium', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'Newest dynamic mechanism. Best-in-class motion range.', img: 'mesh-sku20.jpg',
            signals: { retail: 'Best-Motion', dtc: 'High-Tech', enterprise: 'Motion-Range' }
        }
    ];

    // --- Hotspot Data Model ---
    const MESH_CHAIR_HOTSPOTS = [
        { top: '25%', left: '30%', title: "Modular Component Interchangeability", desc: "Key parts designed for quick swapping across SKU tiers, maximizing your inventory efficiency." }, 
        { top: '55%', left: '60%', title: "Eco-Certified ENERSORB Foam", desc: "Available options include high-density, patented memory foam and recycled polymer materials." },
        { top: '80%', left: '45%', title: "BIFMA X5.1 Base & ANSI Compliant", desc: "Stress-tested aluminum alloy base, ensuring durability and full regulatory compliance." } 
    ];
    
    // --- SKU Dynamic Rendering Logic ---
    function renderSkuCard(sku) {
        const card = document.createElement('div');
        card.className = 'sku-card';
        card.setAttribute('data-price', sku.tier);
        card.setAttribute('data-lumber', sku.lumbar);
        card.setAttribute('data-bifma', sku.bifma);

        // 核心渲染：展示 Tri-Channel 信号 (优先展示 DTC 和 Retail 信号)
        const primarySignal = sku.signals.dtc;
        const secondarySignal = sku.signals.retail;
        
        card.innerHTML = `
            <a href="#contact" class="category-card" style="height: 250px;">
                <div class="category-bg" style="background-image: url('${sku.img}');"></div>
                <div class="category-content" style="padding: 15px;">
                    <h3 style="font-size: 1.1rem;">Model ${sku.model}</h3>
                    <div class="product-meta">
                        <p style="font-size: 0.8rem;">${sku.desc}</p>
                        <span class="product-tag">${primarySignal} | ${secondarySignal}</span>
                    </div>
                </div>
            </a>
        `;
        return card;
    }

    function applyFilters() {
        if (!meshSkuContainer || !priceFilter) return;

        const selectedPrice = priceFilter.value;
        const selectedLumber = lumberFilter.value;
        const selectedBifma = bifmaFilter.value;
        let visibleCount = 0;

        meshSkuContainer.querySelectorAll('.sku-card').forEach(card => card.remove());
        
        ALL_MESH_CHAIR_SKUS.forEach(sku => {
            const priceMatch = (selectedPrice === 'all' || selectedPrice === sku.tier);
            const lumberMatch = (selectedLumber === 'all' || selectedLumber === sku.lumbar);
            const bifmaMatch = (selectedBifma === 'all' || selectedBifma === sku.bifma);

            if (priceMatch && lumberMatch && bifmaMatch) {
                meshSkuContainer.insertBefore(renderSkuCard(sku), noResultsMessage);
                visibleCount++;
            }
        });

        if (visibleCount === 0) {
            if (noResultsMessage) noResultsMessage.style.display = 'block';
        } else {
            if (noResultsMessage) noResultsMessage.style.display = 'none';
        }
    }
    
    // --- Hotspot Rendering Logic ---
    function renderHotspots() {
        if (!showcaseImage) return;
        const infoDisplay = document.createElement('div');
        infoDisplay.id = 'hotspot-display';
        infoDisplay.className = 'hotspot-info';
        infoDisplay.innerHTML = `<h5></h5><p></p><span>Learn more →</span>`;
        showcaseImage.appendChild(infoDisplay);

        MESH_CHAIR_HOTSPOTS.forEach(data => {
            const hotspot = document.createElement('div');
            hotspot.className = 'hotspot';
            hotspot.style.top = data.top;
            hotspot.style.left = data.left;
            
            hotspot.addEventListener('mouseenter', (e) => handleHotspotHover(e, data, infoDisplay));
            hotspot.addEventListener('mouseleave', () => handleHotspotLeave(infoDisplay));
            showcaseImage.appendChild(hotspot);
        });
    }

    let hoverTimeout;
    function handleHotspotHover(e, data, infoDisplay) {
        clearTimeout(hoverTimeout);
        infoDisplay.querySelector('h5').textContent = data.title;
        infoDisplay.querySelector('p').textContent = data.desc;
        const rect = e.target.getBoundingClientRect();
        const containerRect = showcaseImage.getBoundingClientRect();
        infoDisplay.style.top = `${rect.top - containerRect.top - 100}px`; 
        infoDisplay.style.left = `${rect.left - containerRect.left + 35}px`;
        infoDisplay.classList.add('visible');
    }

    function handleHotspotLeave(infoDisplay) {
        hoverTimeout = setTimeout(() => {
            infoDisplay.classList.remove('visible');
        }, 200);
    }
    
    // --- Navigation & Event Bindings ---
    if (menuToggle) {
        menuToggle.addEventListener('click', function() { navLinks.classList.toggle('is-open'); });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() { if (window.innerWidth <= 768) { navLinks.classList.remove('is-open'); } });
        });
        window.addEventListener('resize', function() { if (window.innerWidth > 768) { navLinks.classList.remove('is-open'); } });
    }

    // --- Filter Bindings ---
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);
    if (lumberFilter) lumberFilter.addEventListener('change', applyFilters);
    if (bifmaFilter) bifmaFilter.addEventListener('change', applyFilters);
    
    if (resetButton) resetButton.addEventListener('click', () => {
        if (priceFilter) priceFilter.value = 'all';
        if (lumberFilter) lumberFilter.value = 'all';
        if (bifmaFilter) bifmaFilter.value = 'all';
        applyFilters();
    });


    // --- Initialization ---
    renderHotspots();
    if (priceFilter) applyFilters();
    
    // Sticky CTA logic
    if (stickyCta) {
        window.addEventListener('scroll', function() {
            const heroHeight = document.getElementById('home').offsetHeight;
            if (window.scrollY > heroHeight / 2) {
                stickyCta.style.display = 'block';
            } else {
                stickyCta.style.display = 'none';
            }
        });
    }
});
