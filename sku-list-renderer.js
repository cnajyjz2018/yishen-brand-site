/**
 * Yishen Global — SKU List Renderer 2026
 * 作用：自动从数据库抓取 SKU 并生成带参数的详情页链接
 */
async function renderSKUList() {
    const container = document.getElementById('dynamic-sku-grid');
    if (!container) return;

    try {
        const response = await fetch('sku-db.json');
        const db = await response.json();

        container.innerHTML = ""; // 清空占位符

        // 遍历数据库生成卡片
        Object.entries(db).forEach(([id, data]) => {
            const card = document.createElement('div');
            card.className = 'node-card';
            card.style.cursor = 'pointer';
            
            // 点击卡片直接跳转到带 ID 的详情页
            card.onclick = () => { window.location.href = `sku-detail.html?id=${id}`; };

            card.innerHTML = `
                <div class="sku-thumb" style="height:200px; background:#000; display:flex; align-items:center; justify-content:center; overflow:hidden; border-bottom:1px solid rgba(255,255,255,0.05);">
                    <img src="${data.img}" alt="${data.title}" style="width:80%; transition:0.5s;">
                </div>
                <div style="padding:25px;">
                    <span style="font-family:'JetBrains Mono'; font-size:0.6rem; color:var(--neon-blue); text-transform:uppercase;">${data.sector}</span>
                    <h4 style="color:#fff; margin:10px 0;">${data.title}</h4>
                    <p style="font-size:0.8rem; color:var(--text-dim); line-height:1.5;">${data.desc.substring(0, 60)}...</p>
                    <div style="margin-top:20px; font-family:'JetBrains Mono'; font-size:0.6rem; color:var(--text-dim); opacity:0.5;">
                        ID: ${id} // VIEW_SPECS →
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        console.log(`[SYS] Successfully rendered ${Object.keys(db).length} SKU nodes.`);
    } catch (error) {
        console.error("[SYS] SKU_LIST_RENDER_ERROR:", error);
    }
}

document.addEventListener('DOMContentLoaded', renderSKUList);
