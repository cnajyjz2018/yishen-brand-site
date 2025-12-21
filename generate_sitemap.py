import json
import os
from datetime import datetime

# =========================================================
# [PROTOCOL] 全球主权域名与路径配置
# =========================================================
# 匹配您的 GitHub Pages 物理路径
DOMAIN = "https://cnajyjz2018.github.io/yishen-brand-site/"
OUTPUT_FILE = "sitemap.xml"
# 自动检测账本名称 (兼容 V4/V5 命名)
LEDGER_FILES = ['sku-database.json', 'asset-ledger.json']

class SitemapSovereignty:
    def __init__(self):
        self.now = datetime.now().strftime('%Y-%m-%d')
        self.nodes = []

    def boot(self):
        print("--------------------------------------------------")
        print(f">>> [SYSTEM_V5]: INITIATING_SEO_SOVEREIGNTY_SCAN")
        print(f">>> [TIME]: {datetime.now().strftime('%H:%M:%S')}")
        print("--------------------------------------------------")

        # 1. 物理扫描：捕捉静态 HTML 资产
        self.scan_static_assets()
        
        # 2. 账本对撞：解构动态 SKU 节点
        self.harvest_dynamic_skus()
        
        # 3. 数字化构建：XML 物理写入
        self.construct_xml()

    def scan_static_assets(self):
        """扫描本地目录，提取核心 HTML 页面"""
        exclude_files = ['sku-template.html', 'sku-detail-template.html', '404.html']
        static_pages = [f for f in os.listdir('.') if f.endswith('.html') and f not in exclude_files]
        
        for page in static_pages:
            # 首页赋予最高权重
            priority = "1.0" if page == "index.html" else "0.8"
            self.nodes.append({
                "loc": f"{DOMAIN}{page}",
                "priority": priority,
                "changefreq": "daily" if page == "index.html" else "weekly"
            })
        print(f"[SCAN] Captured {len(static_pages)} static HTML nodes.")

    def harvest_dynamic_skus(self):
        """从资产账本中提取动态详情页路径"""
        ledger_path = next((f for f in LEDGER_FILES if os.path.exists(f)), None)
        
        if not ledger_path:
            print("[WARNING] No asset ledger found. Skipping dynamic nodes.")
            return

        try:
            with open(ledger_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                # 兼容 V4 的 'products' 列表结构或 V5 的 Key-Value 字典结构
                skus = data.get('products', []) if isinstance(data, dict) and 'products' in data else data.values()
                
                count = 0
                for sku in skus:
                    # 获取 SKU ID (兼容 id 或 code_id 字段)
                    sku_id = sku.get('id') or sku.get('code_id')
                    if sku_id:
                        # 映射至详情页 URL 模式
                        self.nodes.append({
                            "loc": f"{DOMAIN}technical-passport.html?id={sku_id}",
                            "priority": "0.7",
                            "changefreq": "weekly"
                        })
                        count += 1
            print(f"[HARVEST] Synchronized {count} dynamic SKU nodes from {ledger_path}.")
        except Exception as e:
            print(f"[ERROR] Ledger collision failed: {e}")

    def construct_xml(self):
        """物理构建符合 Sitemaps.org 标准的 XML 文件"""
        xml_content = [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        ]

        for node in self.nodes:
            xml_content.append('  <url>')
            xml_content.append(f'    <loc>{node["loc"]}</loc>')
            xml_content.append(f'    <lastmod>{self.now}</lastmod>')
            xml_content.append(f'    <changefreq>{node["changefreq"]}</changefreq>')
            xml_content.append(f'    <priority>{node["priority"]}</priority>')
            xml_content.append('  </url>')

        xml_content.append('</urlset>')

        try:
            with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
                f.write('\n'.join(xml_content))
            print("--------------------------------------------------")
            print(f"[SUCCESS] {len(self.nodes)} nodes manifested into {OUTPUT_FILE}")
            print(">>> SEO_SOVEREIGNTY_LOCKED.")
            print("--------------------------------------------------")
        except Exception as e:
            print(f"[CRITICAL] IO Error: {e}")

if __name__ == "__main__":
    SovereignNode = SitemapSovereignty()
    SovereignNode.boot()
