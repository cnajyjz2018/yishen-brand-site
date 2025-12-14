document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const stickyCta = document.getElementById('stickyCta');
    const showcaseImage = document.getElementById('mesh-chair-showcase');

    // --- 热点数据模型 (Data Model) ---
    // 数据驱动：热点信息从这里获取，HTML 保持干净。
    const MESH_CHAIR_HOTSPOTS = [
        // 模块化互换性 (UE/Henglin 借鉴)
        { top: '25%', left: '30%', title: "Modular Component Interchangeability", desc: "Key parts designed for quick swapping across SKU tiers, maximizing your inventory efficiency." }, 
        // 高级材料/可持续性 (Nightingale 借鉴)
        { top: '55%', left: '60%', title: "Eco-Certified ENERSORB Foam", desc: "Available options include high-density, patented memory foam and recycled polymer materials." },
        // 认证/可信度 (Loctek/BIFMA 借鉴)
        { top: '80%', left: '45%', title: "BIFMA X5.1 Base & ANSI Compliant", desc: "Stress-tested aluminum alloy base, ensuring durability and full regulatory compliance." } 
    ];

    // --- 导航菜单逻辑 (生产级 Class Toggling) ---
    menuToggle.addEventListener('click', function() {
        // 使用 Class 切换，样式在 styles.css 中定义
        navLinks.classList.toggle('is-open');
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) { 
                navLinks.classList.remove('is-open');
            }
        });
    });

    // Handle Resize (确保桌面端 Class 移除)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('is-open');
        }
    });


    // --- 热点动态渲染逻辑 (Data Injection & Interaction) ---
    function renderHotspots() {
        // Hotspot Info Display is created by JS
        if (!showcaseImage) return; // 安全检查

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
            
            // Binding events
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
        
        // 调整浮窗的相对定位
        infoDisplay.style.top = `${rect.top - containerRect.top - 100}px`; 
        infoDisplay.style.left = `${rect.left - containerRect.left + 35}px`;

        infoDisplay.classList.add('visible');
    }

    function handleHotspotLeave(infoDisplay) {
        hoverTimeout = setTimeout(() => {
            infoDisplay.classList.remove('visible');
        }, 200);
    }
    
    // --- SKU 筛选逻辑 (Filterable Catalog) ---
    const priceFilter = document.getElementById('filter-price');
    const lumberFilter = document.getElementById('filter-lumber');
    const bifmaFilter = document.getElementById('filter-bifma');
    const resetButton = document.getElementById('reset-filters');
    const skuCards = document.querySelectorAll('.sku-card');
    const noResultsMessage = document.getElementById('no-results-message');

    function applyFilters() {
        if (skuCards.length === 0) return;

        const selectedPrice = priceFilter.value;
        const selectedLumber = lumberFilter.value;
        const selectedBifma = bifmaFilter.value;
        let visibleCount = 0;

        skuCards.forEach(card => {
            const cardPrice = card.getAttribute('data-price');
            const cardLumber = card.getAttribute('data-lumber');
            const cardBifma = card.getAttribute('data-bifma');

            const priceMatch = (selectedPrice === 'all' || selectedPrice === cardPrice);
            const lumberMatch = (selectedLumber === 'all' || selectedLumber === cardLumber);
            const bifmaMatch = (selectedBifma === 'all' || selectedBifma === cardBifma);

            if (priceMatch && lumberMatch && bifmaMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // 显示/隐藏无结果提示
        if (visibleCount === 0) {
            noResultsMessage.style.display = 'block';
        } else {
            noResultsMessage.style.display = 'none';
        }
    }

    // 绑定事件监听器 (仅当筛选器存在时绑定)
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);
    if (lumberFilter) lumberFilter.addEventListener('change', applyFilters);
    if (bifmaFilter) bifmaFilter.addEventListener('change', applyFilters);
    
    // 重置按钮逻辑
    if (resetButton) resetButton.addEventListener('click', () => {
        if (priceFilter) priceFilter.value = 'all';
        if (lumberFilter) lumberFilter.value = 'all';
        if (bifmaFilter) bifmaFilter.value = 'all';
        applyFilters();
    });


    // --- 统一的脚本初始化 ---
    renderHotspots();
    if (priceFilter) applyFilters(); // 仅当筛选器存在时才初始化 SKU 显示
    
    // --- Sticky CTA 浮窗逻辑 ---
    window.addEventListener('scroll', function() {
        if (!stickyCta) return;
        const heroHeight = document.getElementById('home').offsetHeight;
        if (window.scrollY > heroHeight / 2) {
            stickyCta.style.display = 'block';
        } else {
            stickyCta.style.display = 'none';
        }
    });
});
