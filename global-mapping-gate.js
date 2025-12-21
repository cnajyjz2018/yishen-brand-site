/* =========================================================
   YISHEN GLOBAL - GLOBAL_MAPPING_GATE V4.0.MASTER
   Logic: Multi-Region Semantic Alignment & Sovereign Mapping
   Version: 4.0.FINAL (Integrated i18n & Logic Gate)
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

  /* 02_SOVEREIGN_LANG_PACKS: 全球主权语言包（含 28 大类集群映射） */
  const GLOBAL_MAPPING_DB = {
    en: {
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
      nodes: {
        title: "Industrial Nodes.",
        subtitle: "Integrating 28 strategic manufacturing clusters.",
        reddit_pulse: "Monitoring r/OfficeChairs Sentiment..."
      },
      briefing: {
        title: "Execute_Mission_Protocol",
        status: "Direct_Link_Active"
      }
    },
    zh: {
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
      nodes: {
        title: "工业制造节点",
        subtitle: "集成 28 大战略制造集群，展现全域统治力。",
        reddit_pulse: "实时对撞 Reddit 舆情数据..."
      },
      briefing: {
        title: "下达全球制造指令",
        status: "指挥链路已通电"
      }
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
    }

    detectLang() {
      const saved = localStorage.getItem(MAPPING_CONFIG.storageKey);
      if (saved && GLOBAL_MAPPING_DB[saved]) return saved;
      const htmlLang = document.documentElement.lang;
      return (htmlLang && GLOBAL_MAPPING_DB[htmlLang]) ? htmlLang : MAPPING_CONFIG.defaultLang;
    }

    // 递归获取嵌套对象值
    getVal(obj, path) {
      return path.split(".").reduce((o, k) => (o ? o[k] : null), obj);
    }

    applyMapping() {
      const dict = GLOBAL_MAPPING_DB[this.currentLang];
      
      // 遍历所有带有主权属性或旧版属性的元素
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

    switchNode(lang) {
      if (!GLOBAL_MAPPING_DB[lang]) return;
      localStorage.setItem(MAPPING_CONFIG.storageKey, lang);
      location.reload(); // 执行原子级状态刷新，确保逻辑重对撞
    }
  }

  /* 04_PUBLIC_API: 暴露全局指令接口 */
  window.MappingGate = new GlobalMappingGate();

  /* 兼容旧版 API 呼叫 */
  window.YiShenI18N = {
    setLang: (l) => window.MappingGate.switchNode(l),
    getLang: () => window.MappingGate.currentLang
  };

  // DOM 就绪后启动对撞
  document.addEventListener("DOMContentLoaded", () => {
    // 延迟 50ms 确保与主逻辑门 hq-core-gate.js 同步
    setTimeout(() => window.MappingGate.applyMapping(), 50);
  });

})();
