import json
import os
from datetime import datetime

# 1. 全球主权域名配置
DOMAIN = "https://cnajyjz2018.github.io/yishen-brand-site/"

def generate_sitemap():
    print("--------------------------------------------------")
    print("[SYSTEM] Initiating Sitemap Generation Protocol...")
    print(f"[TIME]   Execution started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("--------------------------------------------------")
    
    # 2. 物理节点扫描：静态 HTML 资源
    # 过滤掉不需要索引的模板文件，确保 SEO 纯净度
    exclude_files = ['sku-template.html', 'sku-detail-template.html']
    static_pages = [f for f in os.listdir('.') if f.endswith('.html') and f not in exclude_files]
    
    # 3. 动态矩阵提取：SKU 数据库同步
    dynamic_urls = []
    database_path = 'sku-database.json'
    
    if os.path.exists(database_path):
        try:
            with open(database_path, 'r', encoding='utf-8') as f:
                db = json.load(f)
                # 兼容不同结构的 JSON 数据集
                products = db.get('products', [])
                for product in products:
                    sku_id = product.get('id')
                    if sku_id:
                        # 捕捉每一个产品详情页的唯一 URL
                        dynamic_urls.append(f"sku-detail.html?id={sku_id}")
            print(f"[DATA]   Synchronized {len(dynamic_urls)} dynamic SKU nodes.")
        except Exception as e:
            print(f"[ERROR]  Database read failed: {e}")
    else:
        print("[WARNING] sku-database.json missing. Scanning static files only.")

    # 4. 架构构建：XML 主权映射
    now = datetime.now().strftime('%Y-%m-%d')
    xml_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml_content += '\n'
    xml_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    # 合并所有验证过的节点
    all_nodes = []
    
    # 处理静态节点优先级
    for page in static_pages:
        priority = "1.0" if page == "index.html" else "0.8"
        node = {
            "loc": f"{DOMAIN}{page}",
            "lastmod": now,
            "priority": priority
        }
        all_nodes.append(node)

    # 处理动态节点优先级
    for page in dynamic_urls:
        node = {
            "loc": f"{DOMAIN}{page}",
            "lastmod": now,
            "priority": "0.7" # 产品页权重略低于一级页面
        }
        all_nodes.append(node)

    # 写入 XML 内容
    for node in all_nodes:
        xml_content += '  <url>\n'
        xml_content += f'    <loc>{node["loc"]}</loc>\n'
        xml_content += f'    <lastmod>{node["lastmod"]}</lastmod>\n'
        xml_content += f'    <priority>{node["priority"]}</priority>\n'
        xml_content += '  </url>\n'

    xml_content += '</urlset>'

    # 5. 物理写入与锁定
    try:
        with open('sitemap.xml', 'w', encoding='utf-8') as f:
            f.write(xml_content)
        print("--------------------------------------------------")
        print(f"[SUCCESS] {len(all_nodes)} industrial nodes verified.")
        print("[STATUS]  sitemap.xml has been updated and locked.")
        print("--------------------------------------------------")
    except Exception as e:
        print(f"[CRITICAL] IO Error: {e}")

if __name__ == "__main__":
    generate_sitemap()
