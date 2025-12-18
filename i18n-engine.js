/* =========================================================
   YiShen Global — i18n Engine
   Version: 2026 Stable
   Scope: All Pages / All Components
   ========================================================= */

(function () {
  "use strict";

  /* =============================
     1. Core Configuration
     ============================= */

  const I18N_CONFIG = {
    defaultLang: "en",
    storageKey: "yishen_lang",
    attr: "data-i18n",
    fallback: true,
    debug: false
  };

  /* =============================
     2. Language Packs
     （可无限扩展）
     ============================= */

  const LANG = {

    en: {
      common: {
        nav: {
          home: "Home",
          solutions: "Solutions",
          industries: "Industries",
          resources: "Resources",
          why: "Why Us",
          contact: "Contact"
        },
        footer: {
          tagline: "Furniture-first global supply chain systems.",
          base: "Anji · Hangzhou · China"
        }
      },

      home: {
        hero: {
          title: "Engineering Predictable Furniture Supply",
          subtitle: "Furniture-first systems built for global execution"
        }
      },

      solutions: {
        hero: {
          title: "Solutions Built on Execution Logic",
          subtitle: "Not services. Systems."
        }
      },

      industries: {
        hero: {
          title: "Industries We Serve",
          subtitle: "Furniture as the core system"
        }
      },

      resources: {
        hero: {
          title: "Decision-Grade Resources",
          subtitle: "Built to reduce sourcing risk"
        }
      },

      why: {
        hero: {
          title: "Why YiShen Global",
          subtitle: "Because predictability is engineered"
        }
      },

      contact: {
        hero: {
          title: "Always-on Contact",
          subtitle: "Structured conversations start here"
        }
      }
    },

    zh: {
      common: {
        nav: {
          home: "首页",
          solutions: "解决方案",
          industries: "行业",
          resources: "资源",
          why: "为什么是我们",
          contact: "联系"
        },
        footer: {
          tagline: "以家具为核心的全球供应链系统。",
          base: "中国 · 安吉 / 杭州"
        }
      },

      home: {
        hero: {
          title: "可预测的家具供应工程系统",
          subtitle: "以执行力为核心的全球家具体系"
        }
      },

      solutions: {
        hero: {
          title: "基于工程逻辑的解决方案",
          subtitle: "不是服务，而是系统"
        }
      },

      industries: {
        hero: {
          title: "我们服务的行业",
          subtitle: "家具是母系统"
        }
      },

      resources: {
        hero: {
          title: "决策级资源中心",
          subtitle: "为降低采购风险而生"
        }
      },

      why: {
        hero: {
          title: "为什么选择一深",
          subtitle: "因为稳定是被设计出来的"
        }
      },

      contact: {
        hero: {
          title: "随时可联系",
          subtitle: "从结构化沟通开始"
        }
      }
    }

  };

  /* =============================
     3. Utilities
     ============================= */

  function log(...args) {
    if (I18N_CONFIG.debug) {
      console.log("[i18n]", ...args);
    }
  }

  function get(obj, path) {
    return path.split(".").reduce((o, k) => (o ? o[k] : null), obj);
  }

  function detectLang() {
    const saved = localStorage.getItem(I18N_CONFIG.storageKey);
    if (saved && LANG[saved]) return saved;

    const htmlLang = document.documentElement.lang;
    if (htmlLang && LANG[htmlLang]) return htmlLang;

    return I18N_CONFIG.defaultLang;
  }

  /* =============================
     4. Core Apply Function
     ============================= */

  function applyLang(lang) {
    const dict = LANG[lang] || LANG[I18N_CONFIG.defaultLang];
    const nodes = document.querySelectorAll(`[${I18N_CONFIG.attr}]`);

    nodes.forEach(node => {
      const key = node.getAttribute(I18N_CONFIG.attr);
      const value = get(dict, key);

      if (value !== null && value !== undefined) {
        node.textContent = value;
      } else if (I18N_CONFIG.fallback) {
        const fallbackValue = get(LANG[I18N_CONFIG.defaultLang], key);
        if (fallbackValue) node.textContent = fallbackValue;
      }
    });

    document.documentElement.lang = lang;
    localStorage.setItem(I18N_CONFIG.storageKey, lang);
    log("Language applied:", lang);
  }

  /* =============================
     5. Public API
     ============================= */

  window.YiShenI18N = {
    setLang(lang) {
      if (!LANG[lang]) return;
      applyLang(lang);
    },
    getLang() {
      return detectLang();
    },
    available() {
      return Object.keys(LANG);
    }
  };

  /* =============================
     6. Init on DOM Ready
     ============================= */

  document.addEventListener("DOMContentLoaded", () => {
    const lang = detectLang();
    applyLang(lang);
  });

})();
