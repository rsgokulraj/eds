/* eslint-disable */
/* global WebImporter */

import heroParser from './parsers/hero.js';
import cardsParser from './parsers/cards.js';
import columnsParser from './parsers/columns.js';

import cleanupTransformer from './transformers/greatlocalpubs-cleanup.js';
import sectionsTransformer from './transformers/greatlocalpubs-sections.js';

const parsers = {
  'hero': heroParser,
  'cards': cardsParser,
  'columns': columnsParser,
};

const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Great Local Pubs main landing page',
  urls: ['https://www.greatlocalpubs.co.uk/'],
  blocks: [
    { name: 'hero', instances: ['.home-banner.banner-wrapper'] },
    { name: 'cards', instances: ['.column-articles'] },
    { name: 'columns', instances: ['.cms-176022 .two-col-image-grid', '.cms-176017 .two-col-image-grid'] },
  ],
  sections: [
    { id: 'section-1', name: 'Hero Banner', selector: '.home-banner.banner-wrapper', style: null, blocks: ['hero'], defaultContent: [] },
    { id: 'section-2', name: 'Intro Text', selector: '.cms-176015 .article-wrapper', style: null, blocks: [], defaultContent: ['.article-inner h1', '.article-inner p'] },
    { id: 'section-3', name: 'Three Column Cards', selector: '.column-articles', style: 'light', blocks: ['cards'], defaultContent: [] },
    { id: 'section-4', name: 'Gift Cards', selector: '.cms-176022 .two-col-image-grid', style: null, blocks: ['columns'], defaultContent: [] },
    { id: 'section-5', name: 'Newsletter Signup', selector: '.cms-176017 .two-col-image-grid', style: null, blocks: ['columns'], defaultContent: [] },
  ],
};

const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((fn) => {
    try { fn.call(null, hookName, element, enhancedPayload); } catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
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

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try { parser(block.element, { document, url, params }); } catch (e) { console.error(`Failed to parse ${block.name}:`, e); }
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{ element: main, path, report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) } }];
  },
};
