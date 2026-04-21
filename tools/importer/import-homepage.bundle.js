var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document }) {
    const heading = element.querySelector("h1");
    const img = element.querySelector("picture img[src], img[src]");
    const cells = [];
    if (img) {
      cells.push([img]);
    }
    if (heading) {
      cells.push([heading]);
    }
    const block = WebImporter.Blocks.createBlock(document, {
      name: "hero",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse2(element, { document }) {
    const articles = element.querySelectorAll(".column-article");
    const cells = [];
    articles.forEach((article) => {
      const img = article.querySelector("picture img[src], img[src]");
      const heading = article.querySelector("h3, h2");
      const desc = article.querySelector(".column-article-inside .size-2");
      const cta = article.querySelector(".column-article-cta-central a, a.button");
      const imgCol = document.createElement("div");
      if (img) {
        imgCol.append(img);
      }
      const textCol = document.createElement("div");
      if (heading) {
        const h = document.createElement("p");
        h.innerHTML = "<strong>" + heading.textContent.trim() + "</strong>";
        textCol.append(h);
      }
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc.textContent.trim();
        textCol.append(p);
      }
      if (cta) {
        const link = document.createElement("p");
        const a = document.createElement("a");
        a.href = cta.href;
        a.textContent = cta.textContent.trim();
        link.append(a);
        textCol.append(link);
      }
      cells.push([imgCol, textCol]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "cards",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse3(element, { document }) {
    const imgContainer = element.querySelector(".grid-image");
    const textContainer = element.querySelector(".grid-article-content-inner");
    const img = imgContainer ? imgContainer.querySelector("picture img[src], img[src]") : null;
    const heading = textContainer ? textContainer.querySelector("h2, h3") : null;
    const paragraphs = textContainer ? textContainer.querySelectorAll("p.size-2") : [];
    const cta = textContainer ? textContainer.querySelector("a.button") : null;
    const imgCol = document.createElement("div");
    if (img) {
      imgCol.append(img);
    }
    const textCol = document.createElement("div");
    if (heading) {
      const h = document.createElement("h3");
      h.textContent = heading.textContent.trim();
      textCol.append(h);
    }
    paragraphs.forEach((p) => {
      const text = p.textContent.trim();
      if (text && !p.querySelector("a.button")) {
        const para = document.createElement("p");
        para.textContent = text;
        textCol.append(para);
      }
    });
    if (cta) {
      const link = document.createElement("p");
      const a = document.createElement("a");
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      link.append(a);
      textCol.append(link);
    }
    const isAlternate = element.classList.contains("alternate");
    const cells = isAlternate ? [[textCol, imgCol]] : [[imgCol, textCol]];
    const block = WebImporter.Blocks.createBlock(document, {
      name: "columns",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/transformers/greatlocalpubs-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#onetrust-banner-sdk",
        ".onetrust-pc-dark-filter",
        '[class*="onetrust"]'
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".mob-menu"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".dummy-content-wrapper",
        "#rootLocationLoader"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".search-location-result.root-search-location-result",
        "#map_canvas"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#locationSiteSelector",
        ".cms-176021"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".header-container",
        ".header-top",
        "#footer",
        ".footer-root",
        "footer",
        "nav",
        ".ma5menu",
        ".mob-nav",
        "#js-ma5menu",
        ".smartApp-container",
        ".gold-rule",
        "noscript",
        "link",
        "iframe",
        "select",
        "input",
        ".search-location-result",
        ".root-home-location-search"
      ]);
    }
  }

  // tools/importer/transformers/greatlocalpubs-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectorList = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectorList) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero": parse,
    "cards": parse2,
    "columns": parse3
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Great Local Pubs main landing page",
    urls: ["https://www.greatlocalpubs.co.uk/"],
    blocks: [
      { name: "hero", instances: [".home-banner.banner-wrapper"] },
      { name: "cards", instances: [".column-articles"] },
      { name: "columns", instances: [".cms-176022 .two-col-image-grid", ".cms-176017 .two-col-image-grid"] }
    ],
    sections: [
      { id: "section-1", name: "Hero Banner", selector: ".home-banner.banner-wrapper", style: null, blocks: ["hero"], defaultContent: [] },
      { id: "section-2", name: "Intro Text", selector: ".cms-176015 .article-wrapper", style: null, blocks: [], defaultContent: [".article-inner h1", ".article-inner p"] },
      { id: "section-3", name: "Three Column Cards", selector: ".column-articles", style: "light", blocks: ["cards"], defaultContent: [] },
      { id: "section-4", name: "Gift Cards", selector: ".cms-176022 .two-col-image-grid", style: null, blocks: ["columns"], defaultContent: [] },
      { id: "section-5", name: "Newsletter Signup", selector: ".cms-176017 .two-col-image-grid", style: null, blocks: ["columns"], defaultContent: [] }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((fn) => {
      try {
        fn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({ name: blockDef.name, selector, element, section: blockDef.section || null });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name}:`, e);
          }
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{ element: main, path, report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) } }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
