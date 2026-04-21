/* eslint-disable */
/* global WebImporter */

// Block: cards
// Source: text-and-media-tiles-section (3 benefit cards with icon, title, description)
// URL: https://careers.slugandlettuce.co.uk/

export default function parse(element, { document }) {
  // Find all card tiles
  const tiles = element.querySelectorAll('.bg-light.rounded-base, .bg-light.self-stretch');

  const cells = [];

  tiles.forEach((tile) => {
    // Extract card image
    const img = tile.querySelector('img[src]:not(.invisible)');

    // Extract card title
    const title = tile.querySelector('p.font-semibold');

    // Extract card description
    const descContainer = tile.querySelector('.INHERIT');
    const descPs = descContainer ? descContainer.querySelectorAll('p') : [];
    let descText = '';
    descPs.forEach((p) => {
      const text = p.textContent.trim();
      if (text) descText += text;
    });

    // Build card row: image | text content
    const imgCol = document.createElement('div');
    if (img) {
      const imgEl = document.createElement('img');
      imgEl.setAttribute('src', img.getAttribute('src'));
      imgEl.setAttribute('alt', img.getAttribute('alt') || '');
      imgCol.append(imgEl);
    }

    const textCol = document.createElement('div');
    if (title) {
      const h = document.createElement('p');
      h.innerHTML = `<strong>${title.textContent.trim()}</strong>`;
      textCol.append(h);
    }
    if (descText) {
      const p = document.createElement('p');
      p.textContent = descText;
      textCol.append(p);
    }

    cells.push([imgCol, textCol]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'cards',
    cells,
  });

  element.replaceWith(block);
}
