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
  function parse(element, { document: document2 }) {
    const heading = element.querySelector("h1");
    const imgs = element.querySelectorAll("img");
    let heroImg = null;
    for (const img of imgs) {
      const src = img.getAttribute("src");
      if (src && src.length > 0) {
        heroImg = img;
        break;
      }
    }
    const cells = [];
    if (heroImg) {
      cells.push([heroImg]);
    }
    if (heading) {
      cells.push([heading]);
    }
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "hero",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/job-search.js
  function parse2(element, { document: document2 }) {
    const searchButton = element.querySelector('#search-vacancies, button[id*="search"]');
    const radiusButton = element.querySelector("talos-select span, button span");
    const input = element.querySelector('input[type="search"], input[id]');
    const cells = [];
    const placeholder = input ? input.getAttribute("placeholder") || "Search for a job..." : "Search for a job...";
    cells.push(["placeholder", placeholder]);
    const radius = radiusButton ? radiusButton.textContent.trim() : "10 miles";
    cells.push(["radius", radius]);
    const buttonText = searchButton ? searchButton.textContent.trim().replace(/\s+/g, " ") : "Search";
    cells.push(["button", buttonText]);
    cells.push(["action", "/vacancies"]);
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "job-search",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns.js
  function parse3(element, { document: document2 }) {
    const heading = element.querySelector("h2");
    const textContainer = element.querySelector(".tablet\\:w-2\\/3, .tablet\\:p-0");
    const paragraphs = textContainer ? textContainer.querySelectorAll("p.ql-align-center, p:not(.INHERIT):not(.DEFAULT-UL)") : element.querySelectorAll("p");
    const img = element.querySelector('talos-carousel img[src], img[src*="images"]');
    const textCol = document2.createElement("div");
    if (heading) {
      const h = document2.createElement("h2");
      h.textContent = heading.textContent.trim();
      textCol.append(h);
    }
    const richTextEl = textContainer ? textContainer.querySelector(".INHERIT") : null;
    if (richTextEl) {
      const innerPs = richTextEl.querySelectorAll("p");
      innerPs.forEach((p) => {
        const text = p.textContent.trim();
        if (text && text !== "") {
          const para = document2.createElement("p");
          para.textContent = text;
          textCol.append(para);
        }
      });
    }
    const imgCol = document2.createElement("div");
    if (img) {
      const imgEl = document2.createElement("img");
      imgEl.setAttribute("src", img.getAttribute("src"));
      imgEl.setAttribute("alt", img.getAttribute("alt") || "Section image");
      imgCol.append(imgEl);
    }
    const cells = [];
    cells.push([textCol, imgCol]);
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "columns",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel.js
  function parse4(element, { document: document2 }) {
    const innerPs = element.querySelectorAll(".INHERIT div p, .INHERIT p");
    let quoteText = "";
    for (const p of innerPs) {
      const text = p.textContent.trim();
      if (text && text.startsWith('"')) {
        quoteText = text;
        break;
      }
    }
    if (!quoteText) {
      const fallback = element.querySelector(".min-h-180 p, .min-h-80 p");
      if (fallback) quoteText = fallback.textContent.trim();
    }
    const attributionEls = element.querySelectorAll("p.text-4.leading-25.text-center");
    let attribution = "";
    for (const el of attributionEls) {
      const text = el.textContent.trim();
      if (text && text !== quoteText) {
        attribution = text;
        break;
      }
    }
    const cells = [];
    const quoteEl = document2.createElement("p");
    quoteEl.textContent = quoteText;
    const attrEl = document2.createElement("p");
    attrEl.textContent = attribution;
    cells.push([quoteEl, attrEl]);
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "carousel",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse5(element, { document: document2 }) {
    const tiles = element.querySelectorAll(".bg-light.rounded-base, .bg-light.self-stretch");
    const cells = [];
    tiles.forEach((tile) => {
      const img = tile.querySelector("img[src]:not(.invisible)");
      const title = tile.querySelector("p.font-semibold");
      const descContainer = tile.querySelector(".INHERIT");
      const descPs = descContainer ? descContainer.querySelectorAll("p") : [];
      let descText = "";
      descPs.forEach((p) => {
        const text = p.textContent.trim();
        if (text) descText += text;
      });
      const imgCol = document2.createElement("div");
      if (img) {
        const imgEl = document2.createElement("img");
        imgEl.setAttribute("src", img.getAttribute("src"));
        imgEl.setAttribute("alt", img.getAttribute("alt") || "");
        imgCol.append(imgEl);
      }
      const textCol = document2.createElement("div");
      if (title) {
        const h = document2.createElement("p");
        h.innerHTML = `<strong>${title.textContent.trim()}</strong>`;
        textCol.append(h);
      }
      if (descText) {
        const p = document2.createElement("p");
        p.textContent = descText;
        textCol.append(p);
      }
      cells.push([imgCol, textCol]);
    });
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "cards",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/transformers/slugandlettuce-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        "#onetrust-banner-sdk",
        ".onetrust-pc-dark-filter",
        '[class*="onetrust"]'
      ]);
      const comments = [];
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_COMMENT);
      while (walker.nextNode()) comments.push(walker.currentNode);
      comments.forEach((c) => c.remove());
      WebImporter.DOMUtils.remove(element, [
        ".cdk-visually-hidden",
        '[class*="hidden"]',
        "img.invisible"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "navbar-section",
        "nav",
        "footer",
        '[role="contentinfo"]',
        "router-outlet",
        "noscript",
        "link",
        "iframe"
      ]);
    }
  }

  // tools/importer/transformers/slugandlettuce-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document2 = element.ownerDocument;
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
          const metaBlock = WebImporter.Blocks.createBlock(document2, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          const hr = document2.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero": parse,
    "job-search": parse2,
    "columns": parse3,
    "carousel": parse4,
    "cards": parse5
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Main careers landing page with hero banner, job search widget, brand values, testimonials carousel, and benefits cards",
    urls: ["https://careers.slugandlettuce.co.uk/"],
    blocks: [
      {
        name: "hero",
        instances: ["header-section"]
      },
      {
        name: "job-search",
        instances: ["vacancies-section-filters"]
      },
      {
        name: "columns",
        instances: ["text-and-media-section"]
      },
      {
        name: "carousel",
        instances: ["quotes-section"]
      },
      {
        name: "cards",
        instances: ["text-and-media-tiles-section"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: "header-section",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Job Search",
        selector: "vacancies-section-filters",
        style: "light",
        blocks: ["job-search"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Brand Values",
        selector: ["text-section:first-of-type"],
        style: null,
        blocks: [],
        defaultContent: [
          "text-section:first-of-type h2",
          "text-section:first-of-type p",
          "text-section:first-of-type call-to-action-button"
        ]
      },
      {
        id: "section-4",
        name: "What We're All About",
        selector: "text-and-media-section",
        style: null,
        blocks: ["columns"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "What We're Looking For",
        selector: ["text-section:last-of-type"],
        style: null,
        blocks: [],
        defaultContent: [
          "text-section:last-of-type h2",
          "text-section:last-of-type p",
          "text-section:last-of-type call-to-action-button"
        ]
      },
      {
        id: "section-6",
        name: "Testimonials",
        selector: "quotes-section",
        style: null,
        blocks: ["carousel"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Benefits",
        selector: "text-and-media-tiles-section",
        style: null,
        blocks: ["cards"],
        defaultContent: ["text-and-media-tiles-section h2"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
