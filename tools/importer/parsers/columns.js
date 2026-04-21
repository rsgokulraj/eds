/* eslint-disable */
/* global WebImporter */

// Block: columns
// Source: .two-col-image-grid (two-column layout with image and text)
// URL: https://www.greatlocalpubs.co.uk/

export default function parse(element, { document }) {
  const imgContainer = element.querySelector('.grid-image');
  const textContainer = element.querySelector('.grid-article-content-inner');

  const img = imgContainer ? imgContainer.querySelector('picture img[src], img[src]') : null;
  const heading = textContainer ? textContainer.querySelector('h2, h3') : null;
  const paragraphs = textContainer ? textContainer.querySelectorAll('p.size-2') : [];
  const cta = textContainer ? textContainer.querySelector('a.button') : null;

  const imgCol = document.createElement('div');
  if (img) {
    imgCol.append(img);
  }

  const textCol = document.createElement('div');
  if (heading) {
    const h = document.createElement('h3');
    h.textContent = heading.textContent.trim();
    textCol.append(h);
  }
  paragraphs.forEach((p) => {
    const text = p.textContent.trim();
    if (text && !p.querySelector('a.button')) {
      const para = document.createElement('p');
      para.textContent = text;
      textCol.append(para);
    }
  });
  if (cta) {
    const link = document.createElement('p');
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    link.append(a);
    textCol.append(link);
  }

  // Check if image is on left or right (alternate class means image is on right)
  const isAlternate = element.classList.contains('alternate');
  const cells = isAlternate ? [[textCol, imgCol]] : [[imgCol, textCol]];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'columns',
    cells,
  });

  element.replaceWith(block);
}
