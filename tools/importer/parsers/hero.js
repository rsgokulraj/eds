/* eslint-disable */
/* global WebImporter */

// Block: hero
// Source: .home-banner.banner-wrapper
// URL: https://www.greatlocalpubs.co.uk/

export default function parse(element, { document }) {
  const heading = element.querySelector('h1');
  const img = element.querySelector('picture img[src], img[src]');

  const cells = [];

  if (img) {
    cells.push([img]);
  }

  if (heading) {
    cells.push([heading]);
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'hero',
    cells,
  });

  element.replaceWith(block);
}
