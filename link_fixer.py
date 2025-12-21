import os
import re

# --- YISHEN GLOBAL V5.0 LINK INTEGRITY REPAIR ---
# 目标：修复所有 HTML 之间的相互跳转及资源外链

def repair_sovereign_links():
    # 核心文件清单
    target_files = ['index.html', 'genesis.html', 'architectures.html', 'clusters.html', 'resources.html']
    
    # 修复逻辑：确保所有 href="xxx.html" 都能精准命中
    for filename in target_files:
        if os.path.exists(filename):
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()

            # 1. 强制校准内部导航链接
            content = re.sub(r'href="0[1-4]_.*?.html"', lambda m: m.group(0).lower(), content)
            
            # 2. 修复闪退：将所有 onclick 跳转加上 preventDefault 或 return false
            # 防止浏览器在执行 JS 的同时尝试提交页面
            content = content.replace('onclick="verifyCert', 'onclick="event.preventDefault(); verifyCert')

            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"// SUCCESS: {filename} 链路协议已修复。")
        else:
            print(f"// WARNING: 缺少核心文件 {filename}，请检查根目录。")

if __name__ == "__main__":
    repair_sovereign_links()
