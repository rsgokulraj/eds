/* eslint-disable */
/* global WebImporter */

// Import Script: homepage
// Template: Main careers landing page with hero banner, job search widget, brand values, testimonials carousel, and benefits cards
// Generated: 2026-04-21

// PARSER IMPORTS
import heroParser from './parsers/hero.js';
import jobSearchParser from './parsers/job-search.js';
import columnsParser from './parsers/columns.js';
import carouselParser from './parsers/carousel.js';
import cardsParser from './parsers/cards.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/slugandlettuce-cleanup.js';
import sectionsTransformer from './transformers/slugandlettuce-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero': heroParser,
  'job-search': jobSearchParser,
  'columns': columnsParser,
  'carousel': carouselParser,
  'cards': cardsParser,
};

// PAGE TEMPLATE CONFIGURATION (embedded from page-templates.json)
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Main careers landing page with hero banner, job search widget, brand values, testimonials carousel, and benefits cards',
  urls: ['https://careers.slugandlettuce.co.uk/'],
  blocks: [
    {
      name: 'hero',
      instances: ['header-section'],
    },
    {
      name: 'job-search',
      instances: ['vacancies-section-filters'],
    },
    {
      name: 'columns',
      instances: ['text-and-media-section'],
    },
    {
      name: 'carousel',
      instances: ['quotes-section'],
    },
    {
      name: 'cards',
      instances: ['text-and-media-tiles-section'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: 'header-section',
      style: null,
      blocks: ['hero'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Job Search',
      selector: 'vacancies-section-filters',
      style: 'light',
      blocks: ['job-search'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Brand Values',
      selector: ['text-section:first-of-type'],
      style: null,
      blocks: [],
      defaultContent: [
        'text-section:first-of-type h2',
        'text-section:first-of-type p',
        'text-section:first-of-type call-to-action-button',
      ],
    },
    {
      id: 'section-4',
      name: "What We're All About",
      selector: 'text-and-media-section',
      style: null,
      blocks: ['columns'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: "What We're Looking For",
      selector: ['text-section:last-of-type'],
      style: null,
      blocks: [],
      defaultContent: [
        'text-section:last-of-type h2',
        'text-section:last-of-type p',
        'text-section:last-of-type call-to-action-button',
      ],
    },
    {
      id: 'section-6',
      name: 'Testimonials',
      selector: 'quotes-section',
      style: null,
      blocks: ['carousel'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'Benefits',
      selector: 'text-and-media-tiles-section',
      style: null,
      blocks: ['cards'],
      defaultContent: ['text-and-media-tiles-section h2'],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
