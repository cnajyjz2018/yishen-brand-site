import json
import os
from datetime import datetime

# 配置主权域名
DOMAIN = "https://cnajyjz2018.github.io/yishen-brand-site/"

def generate_sitemap():
    print("[SYSTEM] Initiating Sitemap Generation Protocol...")
    
    # 1. 扫描根目录下的静态 HTML 节点
    static_pages = [f for f in os.listdir('.') if f.endswith('.html') and f != 'sku-template.html']
    
    # 2. 从 SKU 数据库中提取动态节点
    with open('sku-database.json', 'r', encoding='utf-8') as f:
        db = json.load(f)
        dynamic_skus = [p['id'] for p in db.get('products', [])]

    # 3. 构建 XML 结构
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    # 添加静态页面
    for page in static_pages:
        priority = "1.0" if page == "index.html" else "0.8"
        xml_content += f'  <url>\n    <loc>{DOMAIN}{page}</loc>\n    <priority>{priority}</priority>\n  </url>\n'

    # 添加动态 SKU 详情页 [举一反三：SEO 深度覆盖]
    for sku_id in dynamic_skus:
        xml_content += f'  <url>\n    <loc>{DOMAIN}sku-detail.html?id={sku_id}</loc>\n    <priority>0.7</priority>\n  </url>\n'

    xml_content += '</urlset>'

    # 4. 物理写入根目录
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(xml_content)
    
    print(f"[SUCCESS] {len(static_pages) + len(dynamic_skus)} nodes mapped to sitemap.xml")

if __name__ == "__main__":
    generate_sitemap()
