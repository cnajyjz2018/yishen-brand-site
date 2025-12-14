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
        // 创建信息浮窗 DOM 元素
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
            
            // 绑定事件和数据
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
    
    // --- 统一的脚本初始化 ---
    renderHotspots();

    // --- Sticky CTA 浮窗逻辑 ---
    window.addEventListener('scroll', function() {
        // 当滚动超过 Hero Section 时显示 CTA
        const heroHeight = document.getElementById('home').offsetHeight;
        if (window.scrollY > heroHeight / 2) {
            stickyCta.style.display = 'block';
        } else {
            stickyCta.style.display = 'none';
        }
    });
});
