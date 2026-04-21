/* eslint-disable */
/* global WebImporter */

// Block: hero
// Source: header-section (full-width hero with background image and H1)
// URL: https://careers.slugandlettuce.co.uk/

export default function parse(element, { document }) {
  const heading = element.querySelector('h1');

  // Extract hero background image
  const imgs = element.querySelectorAll('img');
  let heroImg = null;
  for (const img of imgs) {
    const src = img.getAttribute('src');
    if (src && src.length > 0) {
      heroImg = img;
      break;
    }
  }

  const cells = [];

  // Row 1: Hero image
  if (heroImg) {
    cells.push([heroImg]);
  }

  // Row 2: Heading text
  if (heading) {
    cells.push([heading]);
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'hero',
    cells,
  });

  element.replaceWith(block);
}
