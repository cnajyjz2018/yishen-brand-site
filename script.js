/* =========================================================================
   YiShen Global B2B - script.js
   V8.1 最终权威版脚本 (SBU Filter & Data Decoupling Foundation)
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    const categoryGrid = document.getElementById('category-grid');
    const categoryTitleTag = document.getElementById('category-title-tag');
    const sbuCards = document.querySelectorAll('.sbu-card');
    const allCategoryCards = document.querySelectorAll('.category-card');
    
    // --- V8.1 核心：数据解耦映射 (为未来异步 JSON 加载做准备) ---
    const DATA_URLS = {
        'furniture': 'data/furniture.json', 'outdoor': 'data/outdoor.json', 
        'bamboo': 'data/bamboo.json', 'flooring': 'data/flooring.json',
        'rigging': 'data/rigging.json', 'biomedical': 'data/biomedical.json',
        'energy': 'data/energy.json', 'logistics': 'data/logistics.json'
    };
    
    let ALL_SKUS_CACHE = {}; // Global cache for all 160 SKUs
    
    // --- 核心函数：SBU 过滤逻辑 (前端交互) ---
    function filterCategories(sbuType) {
        let titleText = "Strategic Product Catalogue (Filtered)";
        
        allCategoryCards.forEach(card => {
            const isMatch = (sbuType === 'all' || card.getAttribute('data-sbu') === sbuType);
            
            // 使用 class 切换状态，控制显示/隐藏和透明度
            if (isMatch) {
                card.classList.remove('inactive');
                card.style.display = 'block'; 
            } else {
                card.classList.add('inactive');
                card.style.display = 'none';
            }
        });
        
        // 更新标题
        switch (sbuType) {
            case 'lifestyle':
                titleText = "SBU Focus: Home & Lifestyle Solutions (I-IV)";
                break;
            case 'industrial':
                titleText = "SBU Focus: Industrial & Safety Engineering (V-VI)";
                break;
            case 'future':
                titleText = "SBU Focus: Future Tech & Energy Systems (VII)";
                break;
            case 'logistics':
                titleText = "SBU Focus: Predictability Services (VIII)";
                break;
            default:
                titleText = "Exploring All 8 Strategic Ecosystems";
        }
        
        categoryTitleTag.textContent = titleText;
        
        // 平滑滚动到目录区 (特斯拉式快速响应)
        if(sbuType !== 'all') {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // --- 初始化：绑定 SBU 点击事件 ---
    sbuCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const sbuType = this.getAttribute('data-sbu');
            
            // 高亮当前 SBU 卡片
            sbuCards.forEach(c => c.style.borderBottomColor = 'transparent');
            this.style.borderBottomColor = '#FF6600';

            filterCategories(sbuType);
        });
    });

    // 网站初始化时，默认展示所有品类
    filterCategories('all'); 
});
