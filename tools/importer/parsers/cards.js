/* eslint-disable */
/* global WebImporter */

// Block: cards
// Source: .column-articles (3 feature cards with image, heading, text, CTA)
// URL: https://www.greatlocalpubs.co.uk/

export default function parse(element, { document }) {
  const articles = element.querySelectorAll('.column-article');

  const cells = [];

  articles.forEach((article) => {
    const img = article.querySelector('picture img[src], img[src]');
    const heading = article.querySelector('h3, h2');
    const desc = article.querySelector('.column-article-inside .size-2');
    const cta = article.querySelector('.column-article-cta-central a, a.button');

    const imgCol = document.createElement('div');
    if (img) {
      imgCol.append(img);
    }

    const textCol = document.createElement('div');
    if (heading) {
      const h = document.createElement('p');
      h.innerHTML = '<strong>' + heading.textContent.trim() + '</strong>';
      textCol.append(h);
    }
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textCol.append(p);
    }
    if (cta) {
      const link = document.createElement('p');
      const a = document.createElement('a');
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      link.append(a);
      textCol.append(link);
    }

    cells.push([imgCol, textCol]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'cards',
    cells,
  });

  element.replaceWith(block);
}
