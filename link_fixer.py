import os
import re

# =========================================================
# YISHEN GLOBAL - LINK_FIXER_V5.0.FINAL
# 目标：跨维度链路对撞修复、防止 JS 冲突闪退、路径资产硬核对位
# 适用：家具、海洋、军工、医疗、基建、升降、碳中和七大主权维度
# =========================================================

class LinkFixer:
    def __init__(self):
        # 核心主权文件清单
        self.target_files = [
            'index.html', 'genesis.html', 'architectures.html', 
            'clusters.html', 'resources.html', 'tactical-briefing.html'
        ]
        # 补丁统计
        self.patch_count = 0

    def boot(self):
        print(">>> [SYSTEM_V5]: INITIATING_LINK_INTEGRITY_REPAIR...")
        
        for filename in self.target_files:
            if os.path.exists(filename):
                self.repair_file(filename)
            else:
                print(f"! [WARNING]: Critical file {filename} missing from root.")
        
        print(f">>> [SUCCESS]: {self.patch_count} patches applied across sovereign nodes.")

    def repair_file(self, filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # [PATCH_01] 内部导航链路对齐：强制转为小写，确保 Linux/Vercel 环境大小写敏感兼容
        content = re.sub(r'href="([0-9a-zA-Z_-]+\.html)"', 
                         lambda m: f'href="{m.group(1).lower()}"', content)

        # [PATCH_02] 阻止默认行为冲突：修复 onclick 导致的页面跳转闪退
        # 确保所有证书校验、情报弹出框不会因默认 a 标签行为导致页面重载
        click_patterns = [
            ('onclick="verifyCert', 'onclick="event.preventDefault(); verifyCert'),
            ('onclick="runAgent', 'onclick="event.preventDefault(); runAgent'),
            ('onclick="previewResource', 'onclick="event.preventDefault(); previewResource')
        ]
        for old, new in click_patterns:
            content = content.replace(old, new)

        # [PATCH_03] 资产路径硬核校准：确保 icons 和 products 指向 V5.0 物理路径
        content = content.replace('src="icons/', 'src="assets/icons/')
        content = content.replace('src="products/', 'src="assets/products/')

        # [PATCH_04] 动态详情页链接对撞：统一指向 technical-passport.html?id=...
        # 修复可能存在的旧版 sku-detail.html 遗留链接
        content = content.replace('href="sku-detail.html', 'href="technical-passport.html')

        # [PATCH_05] 移动端触摸主权：针对全屏导航，确保 touchstart 不与 click 冲突
        if '</body>' in content:
            touch_patch = """
            <script>
                // [LINK_FIXER_MOBILE_PATCH]
                document.querySelectorAll('a, button').forEach(el => {
                    el.addEventListener('touchstart', function(){}, {passive: true});
                });
            </script>
            """
            content = content.replace('</body>', f'{touch_patch}</body>')

        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        self.patch_count += 1
        print(f"// SUCCESS: {filename} 链路协议与事件对撞已校准。")

if __name__ == "__main__":
    fixer = LinkFixer()
    fixer.boot()
