<script>
/* ===========================
   YiShen Global I18N ENGINE
   Furniture-first · Global
=========================== */

const LANGS = {
  en:{dir:"ltr",name:"EN"},
  zh:{dir:"ltr",name:"中文"},
  ja:{dir:"ltr",name:"日本語"},
  ko:{dir:"ltr",name:"한국어"},
  ar:{dir:"rtl",name:"العربية"},
  he:{dir:"rtl",name:"עברית"},
  ru:{dir:"ltr",name:"RU"},
  fr:{dir:"ltr",name:"FR"},
  de:{dir:"ltr",name:"DE"},
  it:{dir:"ltr",name:"IT"},
  es:{dir:"ltr",name:"ES"},
  pt:{dir:"ltr",name:"PT"},
  nl:{dir:"ltr",name:"NL"},
  pl:{dir:"ltr",name:"PL"},
  sv:{dir:"ltr",name:"SE"},
  fi:{dir:"ltr",name:"FI"},
  cs:{dir:"ltr",name:"CZ"},
  hi:{dir:"ltr",name:"HI"},
  th:{dir:"ltr",name:"TH"},
  ms:{dir:"ltr",name:"MY"},
  mn:{dir:"ltr",name:"MN"},
  sw:{dir:"ltr",name:"SW"}
};

/* === 文本仓库（可持续扩展） === */
const TEXT = {
  hero_title:{
    en:"Furniture Built for Scale. Engineered to Deliver.",
    zh:"为规模而生的家具 · 为交付而工程化",
    ja:"スケールのための家具。工学的に設計。",
    ko:"확장을 위해 설계된 가구. 전달을 위해 엔지니어링.",
    de:"Möbel für globale Skalierung entwickelt.",
    it:"Arredi progettati per la scala globale.",
    fr:"Mobilier conçu pour l’échelle mondiale.",
    es:"Muebles diseñados para crecer globalmente.",
    pt:"Móveis projetados para escala global.",
    ru:"Мебель, созданная для масштабирования.",
    ar:"أثاث مصمم للتوسع والتسليم",
    he:"ריהוט שנבנה להתרחבות",
    hi:"वैश्विक स्केल के लिए डिज़ाइन किया गया फर्नीचर",
    th:"เฟอร์นิเจอร์สำหรับการขยายระดับโลก",
    ms:"Perabot untuk skala global.",
    mn:"Дэлхийн хэмжээнд тэлэхэд зориулагдсан тавилга",
    sw:"Samani kwa kiwango cha kimataifa"
  },

  hero_sub:{
    en:"Commercial furniture manufacturing with global supply chain control.",
    zh:"以家具制造为核心的全球供应链体系",
    ja:"家具製造を中核としたグローバル供給網",
    ko:"가구 제조 중심의 글로벌 공급망",
    de:"Möbelfertigung mit globaler Lieferkettenkontrolle",
    fr:"Fabrication de mobilier avec contrôle logistique mondial",
    ar:"تصنيع أثاث مع نظام توريد عالمي"
  }
};

/* === 切换函数 === */
function setLang(lang){
  if(!LANGS[lang]) return;
  document.documentElement.lang = lang;
  document.documentElement.dir  = LANGS[lang].dir;

  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.dataset.i18n;
    if(TEXT[key] && TEXT[key][lang]){
      el.innerText = TEXT[key][lang];
    }
  });

  localStorage.setItem("lang",lang);
}

/* === 初始化 === */
const savedLang = localStorage.getItem("lang") || navigator.language.slice(0,2);
setLang(LANGS[savedLang] ? savedLang : "en");
</script>
