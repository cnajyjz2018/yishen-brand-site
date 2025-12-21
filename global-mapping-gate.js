/* =========================================================
   YISHEN GLOBAL - GLOBAL_MAPPING_GATE V4.0.FINAL.MASTER
   Logic: Multi-Region Semantic Alignment & Sovereign Mapping
   Integrated: locales.json Assets + Arabic Support + Logic Gate
   Authority: Strategic Architecture Group
   ========================================================= */

(function () {
  "use strict";

  /* 01_CORE_CONFIGURATION: 映射门控配置 */
  const MAPPING_CONFIG = {
    defaultLang: "en",
    storageKey: "YIS_GATE_LANG",
    attr: "data-sov-text", // 升级后的主权属性
    legacyAttr: "data-i18n", // 兼容旧版属性
    debug: false
  };

  /* 02_SOVEREIGN_LANG_PACKS: 全球主权语言包（含 28 大类集群与多语映射） */
  const GLOBAL_MAPPING_DB = {
    en: {
      nav_system: "System",
      nav_solutions: "Solutions",
      nav_industries: "Industries",
      nav_whyus: "Protocol",
      nav_resources: "Data Center",
      common: {
        nav: {
          genesis: "01_GENESIS",
          nodes: "02_NODES",
          intel: "03_INTEL",
          briefing: "04_COMMAND"
        },
        authority: {
          bifma: "BIFMA_X5.1_VERIFIED",
          ista: "ISTA_6A_CERTIFIED",
          hscode: "HS_CODE_9401_AUDIT"
        }
      },
      hero: {
        title: "INDUSTRIAL SOVEREIGNTY",
        subtitle: "Furniture-first supply chain architecture for global trade nodes.",
        cta_start: "INITIALIZE PROTOCOL"
      },
      nodes: {
        title: "Industrial Nodes",
        subtitle: "Integrating 28 strategic manufacturing clusters.",
        clusters: {
          seating: "Seating Architecture (HS 9401)",
          chains: "Industrial Chains (HS 7315)",
          flooring: "WPC & SPC Flooring (HS 3918)",
          bamboo: "Bamboo Crafts & Bio-Based (HS 4420)"
        },
        reddit_pulse: "Monitoring r/OfficeChairs Sentiment..."
      },
      evidence: {
        bifma: "BIFMA Performance Verified",
        carbon: "Carbon Neutrality Certified"
      }
    },
    zh: {
      nav_system: "系统总控",
      nav_solutions: "解决方案",
      nav_industries: "产业集群",
      nav_whyus: "合作协议",
      nav_resources: "数据中心",
      common: {
        nav: {
          genesis: "01_起源叙事",
          nodes: "02_工业节点",
          intel: "03_智库对撞",
          briefing: "04_指令下达"
        },
        authority: {
          bifma: "BIFMA_X5.1_权威验证",
          ista: "ISTA_6A_物理合规",
          hscode: "海关 HS_CODE_9401 审计"
        }
      },
      hero: {
        title: "工业主权 · 全球集成",
        subtitle: "为全球进口商构建的数字化供应链架构。",
        cta_start: "初始化协议"
      },
      nodes: {
        title: "工业制造节点",
        subtitle: "集成 28 大战略制造集群，展现全域统治力。",
        clusters: {
          seating: "精密座椅架构 (HS 9401)",
          chains: "工业长虹制链 (HS 7315)",
          flooring: "WPC/SPC 建筑地板 (HS 3918)",
          bamboo: "竹木工艺与生物基材料 (HS 4420)"
        },
        reddit_pulse: "实时对撞 Reddit 舆情数据..."
      },
      evidence: {
        bifma: "BIFMA 性能指标已验证",
        carbon: "碳中和主权认证"
      }
    },
    ar: {
      nav_system: "النظام",
      nav_solutions: "الحلول",
      nav_industries: "الصناعات",
      nav_whyus: "البروتوكول",
      nav_resources: "مركز البيانات",
      hero_title: "السيادة الصناعية",
      hero_subtitle: "بنية سلسلة التوريد المتكاملة للمستوردين العالميين.",
      cta_start: "تهيئة البروتوكول"
    }
  };

  /* 03_MAPPING_ENGINE: 对撞引擎内核 */
  class GlobalMappingGate {
    constructor() {
      this.currentLang = this.detectLang();
      this.init();
    }

    init() {
      if (MAPPING_CONFIG.debug) console.log(`[GATE_ACTIVE]: Mapping established for ${this.currentLang}`);
      this.applyMapping();
      this.applyTextDirection();
    }

    detectLang() {
      const saved = localStorage.getItem(MAPPING_CONFIG.storageKey);
      if (saved && GLOBAL_MAPPING_DB[saved]) return saved;
      const htmlLang = document.documentElement.lang;
      return (htmlLang && GLOBAL_MAPPING_DB[htmlLang]) ? htmlLang : MAPPING_CONFIG.defaultLang;
    }

    getVal(obj, path) {
      return path.split(".").reduce((o, k) => (o ? o[k] : null), obj);
    }

    applyMapping() {
      const dict = GLOBAL_MAPPING_DB[this.currentLang];
      const selector = `[${MAPPING_CONFIG.attr}], [${MAPPING_CONFIG.legacyAttr}]`;
      const nodes = document.querySelectorAll(selector);

      nodes.forEach(node => {
        const key = node.getAttribute(MAPPING_CONFIG.attr) || node.getAttribute(MAPPING_CONFIG.legacyAttr);
        const value = this.getVal(dict, key);

        if (value) {
          if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
            node.placeholder = value;
          } else {
            node.innerText = value;
          }
        }
      });

      document.documentElement.lang = this.currentLang;
      localStorage.setItem(MAPPING_CONFIG.storageKey, this.currentLang);
    }

    /* 处理阿拉伯语等 RTL 语言的物理对撞布局 */
    applyTextDirection() {
      document.body.dir = (this.currentLang === 'ar') ? 'rtl' : 'ltr';
    }

    switchNode(lang) {
      if (!GLOBAL_MAPPING_DB[lang]) return;
      localStorage.setItem(MAPPING_CONFIG.storageKey, lang);
      location.reload(); 
    }
  }

  /* 04_PUBLIC_API: 暴露指令接口 */
  window.MappingGate = new GlobalMappingGate();

  /* 兼容历史 API */
  window.YiShenI18N = {
    setLang: (l) => window.MappingGate.switchNode(l),
    getLang: () => window.MappingGate.currentLang,
    available: () => Object.keys(GLOBAL_MAPPING_DB)
  };

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => window.MappingGate.applyMapping(), 50);
  });

})();
