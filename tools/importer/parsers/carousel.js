/* eslint-disable */
/* global WebImporter */

// Block: carousel
// Source: quotes-section (testimonial carousel with prev/next)
// URL: https://careers.slugandlettuce.co.uk/

export default function parse(element, { document }) {
  // Extract quote text - get innermost p with actual quote content
  const innerPs = element.querySelectorAll('.INHERIT div p, .INHERIT p');
  let quoteText = '';
  for (const p of innerPs) {
    const text = p.textContent.trim();
    if (text && text.startsWith('"')) {
      quoteText = text;
      break;
    }
  }
  if (!quoteText) {
    // Fallback: get first meaningful text from the quote area
    const fallback = element.querySelector('.min-h-180 p, .min-h-80 p');
    if (fallback) quoteText = fallback.textContent.trim();
  }

  // Extract attribution (job title)
  const attributionEls = element.querySelectorAll('p.text-4.leading-25.text-center');
  let attribution = '';
  for (const el of attributionEls) {
    const text = el.textContent.trim();
    if (text && text !== quoteText) {
      attribution = text;
      break;
    }
  }

  const cells = [];

  // Each row is a testimonial slide: quote | attribution
  const quoteEl = document.createElement('p');
  quoteEl.textContent = quoteText;

  const attrEl = document.createElement('p');
  attrEl.textContent = attribution;

  cells.push([quoteEl, attrEl]);

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'carousel',
    cells,
  });

  element.replaceWith(block);
}
