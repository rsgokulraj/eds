/* eslint-disable */
/* global WebImporter */

// Block: columns
// Source: text-and-media-section (two-column layout: text + image)
// URL: https://careers.slugandlettuce.co.uk/

export default function parse(element, { document }) {
  // Extract text content (left side)
  const heading = element.querySelector('h2');
  const textContainer = element.querySelector('.tablet\\:w-2\\/3, .tablet\\:p-0');
  const paragraphs = textContainer
    ? textContainer.querySelectorAll('p.ql-align-center, p:not(.INHERIT):not(.DEFAULT-UL)')
    : element.querySelectorAll('p');

  // Extract image (right side)
  const img = element.querySelector('talos-carousel img[src], img[src*="images"]');

  // Build text column content
  const textCol = document.createElement('div');
  if (heading) {
    const h = document.createElement('h2');
    h.textContent = heading.textContent.trim();
    textCol.append(h);
  }

  // Get the rich text content
  const richTextEl = textContainer ? textContainer.querySelector('.INHERIT') : null;
  if (richTextEl) {
    const innerPs = richTextEl.querySelectorAll('p');
    innerPs.forEach((p) => {
      const text = p.textContent.trim();
      if (text && text !== '') {
        const para = document.createElement('p');
        para.textContent = text;
        textCol.append(para);
      }
    });
  }

  // Build image column content
  const imgCol = document.createElement('div');
  if (img) {
    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', img.getAttribute('src'));
    imgEl.setAttribute('alt', img.getAttribute('alt') || 'Section image');
    imgCol.append(imgEl);
  }

  const cells = [];
  // Single row with two columns: text | image
  cells.push([textCol, imgCol]);

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'columns',
    cells,
  });

  element.replaceWith(block);
}
