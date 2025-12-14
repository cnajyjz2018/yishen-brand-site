/* =========================================================================
   YiShen Global B2B - script.js
   最终权威版脚本 (Tri-Channel Fusion 20 SKU 架构 - 已更新 SKU 链接)
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
    const detailContent = document.getElementById('detail-content');

    // --- 战略核心：20个 SKU 的数据模型 (已集成 Tri-Channel 营销信号) ---
    // signals: { retail, dtc, enterprise } 用于决定 SKU 卡片上的营销标签
    // Img paths use placeholders/stock photo names, assuming these are provided in assets/images/
    const ALL_MESH_CHAIR_SKUS = [
        // 经济型 (Economic)
        { 
            model: 'YS-001', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Fixed lumbar, High volume SKU. FCL: 750 units.', img: 'assets/images/economic-simple-black.jpg',
            signals: { retail: 'BIFMA-PASS', dtc: '72H-Ship', enterprise: 'High-Vol-Cap' },
            specs: { arms: 'Fixed T-Arms', tilt: 'Basic Tilt Lock', base: 'Nylon 5-Star', warranty: '1 Year', material: 'Standard Mesh' }
        }, 
        { 
            model: 'YS-003', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: '1-Year warranty, Cost-optimized design.', img: 'assets/images/economic-midback-grey.jpg',
            signals: { retail: 'Cost-Down', dtc: 'Fast-Assemble', enterprise: 'Basic-Project' },
            specs: { arms: 'Fixed Loop Arms', tilt: 'Basic Tilt Lock', base: 'Nylon 5-Star', warranty: '1 Year', material: 'Standard Mesh' }
        }, 
        { 
            model: 'YS-010', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Entry-level mesh, basic tilt mechanism. Quick inventory turnover.', img: 'assets/images/economic-lowback-white.jpg',
            signals: { retail: 'Quick-Turnover', dtc: 'Simple-SKU', enterprise: 'Bulk-Discount' },
            specs: { arms: 'Fixed', tilt: 'Basic Tilt Lock', base: 'Nylon 5-Star', warranty: '1 Year', material: 'Standard Mesh' }
        }, 
        { 
            model: 'YS-012', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Fixed arms and headrest. Simplest assembly for DTC.', img: 'assets/images/economic-headrest-black.jpg',
            signals: { retail: 'Fixed-Price', dtc: 'Ease-of-Use', enterprise: 'Low-Spec' },
            specs: { arms: 'Fixed', tilt: 'Basic Tilt Lock', base: 'Nylon 5-Star', warranty: '1 Year', material: 'Standard Mesh' }
        }, 
        { 
            model: 'YS-015', tier: 'economic', lumbar: '2d', bifma: 'bifma', 
            desc: 'Economic with essential 2D adjustable armrests. Value leader.', img: 'assets/images/economic-2d-arms-blue.jpg',
            signals: { retail: '2D-Value', dtc: 'Adjustable-Arms', enterprise: 'Cost-Upgrade' },
            specs: { arms: '2D Adjustable', tilt: 'Basic Tilt Lock', base: 'Nylon 5-Star', warranty: '2 Year', material: 'Standard Mesh' }
        }, 
        // 标准型 (Standard)
        { 
            model: 'YS-002', tier: 'standard', lumbar: '2d', bifma: 'bifma', 
            desc: '2D adjustable lumbar/armrests, High mesh content. Mid-market stable.', img: 'assets/images/standard-2d-lumbar-black.jpg',
            signals: { retail: 'Spare-Stock-Ready', dtc: 'Low-Damage-Pack', enterprise: 'BIFMA-PLUS' },
            specs: { arms: '2D Adjustable', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        }, 
        { 
            model: 'YS-005', tier: 'standard', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'Dynamic lumbar support, Standard tier mesh. High user comfort rating.', img: 'assets/images/standard-dynamic-lumbar-grey.jpg',
            signals: { retail: 'Factory-Audited', dtc: 'Quick-Iteration', enterprise: 'ESG-Ready' },
            specs: { arms: '3D Adjustable', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        }, 
        { 
            model: 'YS-020', tier: 'standard', lumbar: '2d', bifma: 'bifma', 
            desc: 'Synchronous tilt mechanism, nylon base, popular standard model.', img: 'assets/images/standard-synchrotilt-black.jpg',
            signals: { retail: 'Synchro-Tilt', dtc: 'Easy-Custom', enterprise: 'Standard-Reliable' },
            specs: { arms: '2D Adjustable', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        }, 
        { 
            model: 'YS-025', tier: 'standard', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'Dynamic lumbar, medium back height. Optimized for small/medium users.', img: 'assets/images/standard-midback-dynamic-blue.jpg',
            signals: { retail: 'Size-Optimization', dtc: 'Mid-Tier-Perf', enterprise: 'Dynamic-Proj' },
            specs: { arms: '2D Adjustable', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        }, 
        { 
            model: 'YS-030', tier: 'standard', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Standard mesh, fixed lumbar, with adjustable headrest. Cost-effective ergonomics.', img: 'assets/images/standard-fixed-headrest-black.jpg',
            signals: { retail: 'Adj-Headrest', dtc: 'Aesthetic-Clean', enterprise: 'Standard-Ergo' },
            specs: { arms: 'Fixed T-Arms', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        }, 
        { 
            model: 'YS-035', tier: 'standard', lumbar: '2d', bifma: 'ul', 
            desc: 'Standard tier, but with UL certified components for enhanced safety compliance.', img: 'assets/images/standard-ul-certified-white.jpg',
            signals: { retail: 'UL-Certified', dtc: 'Safety-First', enterprise: 'Proj-Compliance' },
            specs: { arms: '2D Adjustable', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        }, 
        { 
            model: 'YS-040', tier: 'standard', lumbar: 'fixed', bifma: 'ul', 
            desc: 'High-back mesh, fixed lumbar, certified for commercial projects.', img: 'assets/images/standard-commercial-fixed-grey.jpg',
            signals: { retail: 'Commercial-Grade', dtc: 'High-Back', enterprise: 'Contract-Ready' },
            specs: { arms: 'Fixed Loop Arms', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        }, 
        // 旗舰型 (Premium)
        { 
            model: 'YS-007', tier: 'premium', lumbar: 'dynamic', bifma: 'ul', 
            desc: 'Dynamic lumbar, Aluminum base, UL Certified. Flagship stability.', img: 'assets/images/premium-aluminum-base-black.jpg',
            signals: { retail: 'UL-Comp', dtc: 'Modular-Design', enterprise: 'Digital-Twin' },
            specs: { arms: '4D Adjustable', tilt: 'Advanced Fluid Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        }, 
        { 
            model: 'YS-009', tier: 'premium', lumbar: 'dynamic', bifma: 'ul', 
            desc: 'Full adjustable headrest, 5-Year warranty. Executive comfort.', img: 'assets/images/premium-executive-headrest-brown.jpg',
            signals: { retail: '5-Year-Warranty', dtc: 'Aesthetic-Premium', enterprise: 'Project-Tier-A' },
            specs: { arms: '4D Adjustable', tilt: 'Advanced Fluid Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        }, 
        { 
            model: 'YS-050', tier: 'premium', lumbar: 'dynamic', bifma: 'ul', 
            desc: '4D armrests, advanced wire control mechanism. Highest durability rating.', img: 'assets/images/premium-wire-control-black.jpg',
            signals: { retail: '4D-Armrests', dtc: 'Wire-Control', enterprise: 'Highest-Durability' },
            specs: { arms: '4D Adjustable', tilt: 'Advanced Fluid Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        }, 
        { 
            model: 'YS-055', tier: 'premium', lumbar: '2d', bifma: 'ul', 
            desc: 'Premium mesh, 2D lumbar. Focus on material breathability and lifespan.', img: 'assets/images/premium-breathable-white.jpg',
            signals: { retail: 'Breathable-Mesh', dtc: 'Long-Lifespan', enterprise: 'Material-Cert' },
            specs: { arms: '3D Adjustable', tilt: 'Advanced Fluid Motion', base: 'Aluminum Alloy', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        }, 
        { 
            model: 'YS-060', tier: 'premium', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'Dynamic lumbar, polished aluminum base. Design-first premium model.', img: 'assets/images/premium-design-first-grey.jpg',
            signals: { retail: 'Design-First', dtc: 'Aesthetic-Focus', enterprise: 'Premium-Finish' },
            specs: { arms: '4D Adjustable', tilt: 'Advanced Fluid Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        }, 
        { 
            model: 'YS-065', tier: 'premium', lumbar: '2d', bifma: 'bifma', 
            desc: 'Adjustable headrest, waterfall seat edge. High-spec comfort.', img: 'assets/images/premium-waterfall-edge-black.jpg',
            signals: { retail: 'Waterfall-Edge', dtc: 'High-Spec', enterprise: 'Ergo-Max' },
            specs: { arms: '4D Adjustable', tilt: 'Advanced Fluid Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        },
        { 
            model: 'YS-070', tier: 'premium', lumbar: 'fixed', bifma: 'ul', 
            desc: 'Executive style, simplified fixed lumbar for clean aesthetic. UL Certified.', img: 'assets/images/premium-executive-clean-black.jpg',
            signals: { retail: 'Executive-Style', dtc: 'Clean-Aesthetic', enterprise: 'Fixed-Luxury' },
            specs: { arms: 'Fixed Aluminum', tilt: 'Advanced Fluid Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        },
        { 
            model: 'YS-075', tier: 'premium', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'Newest dynamic mechanism. Best-in-class motion range.', img: 'assets/images/premium-motion-range-red.jpg',
            signals: { retail: 'Best-Motion', dtc: 'High-Tech', enterprise: 'Motion-Range' },
            specs: { arms: '4D Adjustable', tilt: 'Advanced Dynamic Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        },
        { 
            model: 'YS-076', tier: 'standard', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'High-back mesh, fixed lumbar, certified for commercial projects.', img: 'assets/images/standard-commercial-fixed-grey.jpg',
            signals: { retail: 'Commercial-Grade', dtc: 'High-Back', enterprise: 'Contract-Ready' },
            specs: { arms: 'Fixed Loop Arms', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        }, 
        { 
            model: 'YS-077', tier: 'standard', lumbar: 'fixed', bifma: 'ul', 
            desc: 'Standard tier, but with UL certified components for enhanced safety compliance.', img: 'assets/images/standard-ul-certified-white.jpg',
            signals: { retail: 'UL-Certified', dtc: 'Safety-First', enterprise: 'Proj-Compliance' },
            specs: { arms: '2D Adjustable', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        },
        { 
            model: 'YS-078', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Fixed arms and headrest. Simplest assembly for DTC.', img: 'assets/images/economic-headrest-black.jpg',
            signals: { retail: 'Fixed-Price', dtc: 'Ease-of-Use', enterprise: 'Low-Spec' },
            specs: { arms: 'Fixed', tilt: 'Basic Tilt Lock', base: 'Nylon 5-Star', warranty: '1 Year', material: 'Standard Mesh' }
        }, 
        { 
            model: 'YS-079', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Entry-level mesh, basic tilt mechanism. Quick inventory turnover.', img: 'assets/images/economic-lowback-white.jpg',
            signals: { retail: 'Quick-Turnover', dtc: 'Simple-SKU', enterprise: 'Bulk-Discount' },
            specs: { arms: 'Fixed', tilt: 'Basic Tilt Lock', base: 'Nylon 5-Star', warranty: '1 Year', material: 'Standard Mesh' }
        }, 
        { 
            model: 'YS-080', tier: 'premium', lumbar: 'dynamic', bifma: 'ul', 
            desc: 'Dynamic lumbar, Aluminum base, UL Certified. Flagship stability.', img: 'assets/images/premium-aluminum-base-black.jpg',
            signals: { retail: 'UL-Comp', dtc: 'Modular-Design', enterprise: 'Digital-Twin' },
            specs: { arms: '4D Adjustable', tilt: 'Advanced Fluid Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        }, 
        { 
            model: 'YS-081', tier: 'premium', lumbar: 'dynamic', bifma: 'ul', 
            desc: 'Full adjustable headrest, 5-Year warranty. Executive comfort.', img: 'assets/images/premium-executive-headrest-brown.jpg',
            signals: { retail: '5-Year-Warranty', dtc: 'Aesthetic-Premium', enterprise: 'Project-Tier-A' },
            specs: { arms: '4D Adjustable', tilt: 'Advanced Fluid Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        },
        { 
            model: 'YS-082', tier: 'economic', lumbar: '2d', bifma: 'bifma', 
            desc: 'Economic with essential 2D adjustable armrests. Value leader.', img: 'assets/images/economic-2d-arms-blue.jpg',
            signals: { retail: '2D-Value', dtc: 'Adjustable-Arms', enterprise: 'Cost-Upgrade' },
            specs: { arms: '2D Adjustable', tilt: 'Basic Tilt Lock', base: 'Nylon 5-Star', warranty: '2 Year', material: 'Standard Mesh' }
        }, 
        { 
            model: 'YS-083', tier: 'standard', lumbar: '2d', bifma: 'bifma', 
            desc: 'Synchronous tilt mechanism, nylon base, popular standard model.', img: 'assets/images/standard-synchrotilt-black.jpg',
            signals: { retail: 'Synchro-Tilt', dtc: 'Easy-Custom', enterprise: 'Standard-Reliable' },
            specs: { arms: '2D Adjustable', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        }, 
        { 
            model: 'YS-084', tier: 'premium', lumbar: 'fixed', bifma: 'ul', 
            desc: 'Executive style, simplified fixed lumbar for clean aesthetic. UL Certified.', img: 'assets/images/premium-executive-clean-black.jpg',
            signals: { retail: 'Executive-Style', dtc: 'Clean-Aesthetic', enterprise: 'Fixed-Luxury' },
            specs: { arms: 'Fixed Aluminum', tilt: 'Advanced Fluid Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        },
        { 
            model: 'YS-085', tier: 'standard', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'Dynamic lumbar, medium back height. Optimized for small/medium users.', img: 'assets/images/standard-midback-dynamic-blue.jpg',
            signals: { retail: 'Size-Optimization', dtc: 'Mid-Tier-Perf', enterprise: 'Dynamic-Proj' },
            specs: { arms: '2D Adjustable', tilt: 'Synchro-Tilt', base: 'Nylon Reinforced', warranty: '3 Year', material: 'High Density Mesh' }
        },
        { 
            model: 'YS-086', tier: 'economic', lumbar: 'fixed', bifma: 'bifma', 
            desc: 'Fixed lumbar, High volume SKU. FCL: 750 units.', img: 'assets/images/economic-simple-black.jpg',
            signals: { retail: 'BIFMA-PASS', dtc: '72H-Ship', enterprise: 'High-Vol-Cap' },
            specs: { arms: 'Fixed T-Arms', tilt: 'Basic Tilt Lock', base: 'Nylon 5-Star', warranty: '1 Year', material: 'Standard Mesh' }
        },
        { 
            model: 'YS-087', tier: 'premium', lumbar: 'dynamic', bifma: 'bifma', 
            desc: 'Newest dynamic mechanism. Best-in-class motion range.', img: 'assets/images/premium-motion-range-red.jpg',
            signals: { retail: 'Best-Motion', dtc: 'High-Tech', enterprise: 'Motion-Range' },
            specs: { arms: '4D Adjustable', tilt: 'Advanced Dynamic Motion', base: 'Polished Aluminum', warranty: '5 Year', material: 'Kevlar Reinforced Mesh' }
        }
    ];
    
    // Function to find SKU data
    const findSku = (model) => ALL_MESH_CHAIR_SKUS.find(sku => sku.model === model);


    // --- Hotspot Data Model (No change) ---
    const MESH_CHAIR_HOTSPOTS = [
        { top: '25%', left: '30%', title: "Modular Component Interchangeability", desc: "Key parts designed for quick swapping across SKU tiers, maximizing your inventory efficiency." }, 
        { top: '55%', left: '60%', title: "Eco-Certified ENERSORB Foam", desc: "Available options include high-density, patented memory foam and recycled polymer materials." },
        { top: '80%', left: '45%', title: "BIFMA X5.1 Base & ANSI Compliant", desc: "Stress-tested aluminum alloy base, ensuring durability and full regulatory compliance." } 
    ];
    
    // --- SKU Dynamic Rendering Logic (Index.html) ---
    function renderSkuCard(sku) {
        const card = document.createElement('div');
        card.className = 'sku-card';
        card.setAttribute('data-price', sku.tier);
        card.setAttribute('data-lumber', sku.lumbar);
        card.setAttribute('data-bifma', sku.bifma);

        const primarySignal = sku.signals.dtc;
        const secondarySignal = sku.signals.retail;
        
        // ⭐ 关键修改: 链接到 sku-detail.html 并传递 model 参数 (SKU ID) ⭐
        const detailLink = `sku-detail.html?model=${sku.model}`;

        card.innerHTML = `
            <a href="${detailLink}" class="category-card" style="height: 250px;">
                <div class="category-bg" style="background-image: url('${sku.img}');"></div>
                <div class="category-content" style="padding: 15px;">
                    <h3 style="font-size: 1.1rem;">Model ${sku.model}</h3>
                    <div class="product-meta">
                        <p style="font-size: 0.8rem;">${sku.desc}</p>
                        <span class="product-tag">${primarySignal} | ${secondarySignal}</span>
                    </div>
                    <span class="view-btn" style="font-size: 0.9rem; color: #FFC300; margin-top: 5px;">View Specs & Data Sheet &rarr;</span>
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
    
    // --- Hotspot Rendering Logic (Index.html) ---
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
    
    // --- SKU Detail Page Rendering (sku-detail.html logic) ---
    function renderSkuDetail() {
        if (!detailContent) return; // Only run on sku-detail.html

        const urlParams = new URLSearchParams(window.location.search);
        const model = urlParams.get('model');
        const skuData = findSku(model);

        const pageTitle = document.getElementById('pageTitle');
        const skuName = document.getElementById('skuName');
        const skuTagline = document.getElementById('skuTagline');
        const skuImage = document.getElementById('skuImage');
        const skuCode = document.getElementById('skuCode');
        const skuTier = document.getElementById('skuTier');
        const specsTableBody = document.getElementById('specsTableBody');
        const skuFeatures = document.getElementById('skuFeatures');
        
        if (!skuData) {
            pageTitle.textContent = "Error - SKU Not Found";
            if (skuName) skuName.textContent = "Error: Product Model Not Found";
            return;
        }

        // Set Metadata and Header
        pageTitle.textContent = `Specs: Model ${skuData.model} - YiShen Global`;
        skuName.textContent = `Model: ${skuData.model} (${skuData.tier.toUpperCase()})`;
        skuTagline.textContent = skuData.desc;
        skuImage.src = skuData.img;
        skuCode.textContent = skuData.model;
        skuTier.textContent = skuData.tier.toUpperCase();
        
        // Populate Specifications Table
        specsTableBody.innerHTML = `
            <tr><th>Armrest Adjustment</th><td>${skuData.specs.arms}</td></tr>
            <tr><th>Tilt Mechanism</th><td>${skuData.specs.tilt}</td></tr>
            <tr><th>Base Material</th><td>${skuData.specs.base}</td></tr>
            <tr><th>Warranty Period</th><td>${skuData.specs.warranty}</td></tr>
            <tr><th>Mesh Material</th><td>${skuData.specs.material}</td></tr>
        `;

        // Populate Key Features (Using Signals for demonstration)
        skuFeatures.innerHTML = '';
        Object.entries(skuData.signals).forEach(([channel, signal]) => {
            const li = document.createElement('li');
            li.textContent = `${channel.toUpperCase()} Channel Focus: ${signal}`;
            skuFeatures.appendChild(li);
        });

        // Add a final CTA for technical data
        skuFeatures.innerHTML += `<li><strong style="color: ${document.documentElement.style.getPropertyValue('--accent')};">Download Technical Data Sheet (PDF) &rarr;</strong></li>`;
    }


    // --- Initialization ---
    if (document.body.classList.contains('sku-detail')) {
        renderSkuDetail();
    } else {
        renderHotspots();
        if (priceFilter) applyFilters();
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
