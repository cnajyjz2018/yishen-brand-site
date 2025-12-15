# 🚀 YiShen Global B2B 供应链集成商独立站项目

## 🌟 项目摘要 (Project Summary)

本项目旨在为 YiShen Global 打造一个顶级、权威、高转化率的 B2B 独立站，将品牌定位从传统家具出口商升级为**“供应链风险管理和效率优化战略伙伴”**。

网站设计和文案全面对标国际高端品牌（如 Nightingale, Secretlab, Autonomous），并融合了 DTC/B2B 贸易模式的最新需求。

**核心价值主张 (Core USP):** Supply Chain Predictability. Engineered for DTC Growth.

## 🛠️ 技术部署与运行环境 (Deployment & Setup)

本项目采用轻量级前端架构，便于快速部署和维护。

### 1. 项目结构 (Project Structure)

| 文件/目录 | 描述 | 战略定位 |
| :--- | :--- | :--- |
| `index.html` | 核心主页。 单页结构 (SPA 风格)，包含所有 CSS/JS 逻辑的最终整合版本。 | 转化中心 |
| `styles.css` | 网站所有视觉和响应式样式，包含移动端菜单状态。 | 视觉权威 |
| `script.js` | 所有动态逻辑（热点、筛选、菜单等）。 | 功能敏捷 |
| `resources.html` | 权威知识库，提供 B2B 决策支持文档。 | 内容营销/权威建立 |
| `solutions.html` | 解决方案中心，详细说明如何解决客户四大核心痛点。 | 价值量化 |
| `why-us.html` | 信任量化中心，量化 YiShen Global 的运营和产品价值。 | 最终说服 |
| `/assets/` | 所有图片资产（需确保 `banner2.jpg`, `mesh.jpg` 等文件存在）。 | 视觉资产 |

### 2. 运行要求

* **环境:** 任何现代 Web 服务器 (Apache, Nginx) 或本地文件系统。
* **依赖:** 无外部框架依赖 (原生 HTML/CSS/JavaScript)，仅需引入 Font Awesome 6.0 CSS CDN。

### 3. 本地部署 (Local Setup)

1.  将所有 `.html`, `.css`, `.js` 文件放置在同一目录下。
2.  确保 `index.html` 中引用的所有图片（例如 `mesh.jpg`, `hero-bg.jpg` 等）存在于项目根目录或 correct 的相对路径下。
3.  通过浏览器直接打开 `index.html` 即可运行。

## 🎯 战略功能与优化总结 (Strategic Features & Optimization)

本项目已实现以下关键优化，以提升 B2B 客户体验和转化率：

| 战略区域 | 优化内容 | 战略目标 |
| :--- | :--- | :--- |
| **UX/UI 结构** | 单页 (SPA 风格) 结合多页面 (Resources/Solutions) 深度内容。 | 速度与专业度兼顾 |
| **产品展示** | 引入 SKU 筛选中心 (#mesh-chair-catalog) 和热点互动。 | 解决海量 SKU 导航痛点 |
| **CTA 优化** | 植入高价值 CTA：量化风险评估、备件库存查询、DTC 包装下载。 | 提升 Leads 质量 |
| **联系渠道** | Footer 集成 WeChat (19530394133) 和 WhatsApp (+86 159 6827 7867)。 | 实现实时、多渠道沟通 |
| **代码架构** | 移动端菜单逻辑、热点渲染逻辑全部使用原生 JS 实现数据驱动。 | 高可维护性和高性能 |

## 📝 迭代与维护指南 (Maintenance Guide)

### 1. 内容更新

* **核心文案:** 位于各个 `.html` 文件中，请直接修改。
* **SKU 数据:** 网椅 SKU 列表及筛选逻辑位于 `script.js` 文件的 `applyFilters` 函数和 HTML 中的 `.sku-card data-*` 属性内。
* **热点数据:** 产品热点数据模型位于 `script.js` 的 `MESH_CHAIR_HOTSPOTS` 数组中。

### 2. 图片优化 (Critical)

所有图片必须针对 Web 进行优化，以保证 LCP (Largest Contentful Paint) 性能指标：

* **格式:** 优先使用 WebP 或高质量 JPG 格式。
* **响应式:** 建议使用 HTML `<picture>` 标签为 Hero Banner 提供不同分辨率的图片源。

### 3. 战略联系信息 (E-A-T)

* **Alex C. Yang 链接:** 务必保持 Footer 和 Why Us 页面中的 LinkedIn、YouTube、X 等社交媒体链接的有效性，这是建立个人权威 (E-A-T) 的关键。

---

**项目由 Gemini 智能助手协助设计和优化 | 版权所有 © 2026 YiShen Global**
