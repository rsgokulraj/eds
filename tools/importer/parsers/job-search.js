/* eslint-disable */
/* global WebImporter */

// Block: job-search
// Source: vacancies-section-filters (search widget with location input, radius, and button)
// URL: https://careers.slugandlettuce.co.uk/

export default function parse(element, { document }) {
  // Extract search configuration from the widget
  const searchButton = element.querySelector('#search-vacancies, button[id*="search"]');
  const radiusButton = element.querySelector('talos-select span, button span');
  const input = element.querySelector('input[type="search"], input[id]');

  const cells = [];

  // Row 1: Placeholder text
  const placeholder = input ? (input.getAttribute('placeholder') || 'Search for a job...') : 'Search for a job...';
  cells.push(['placeholder', placeholder]);

  // Row 2: Default radius
  const radius = radiusButton ? radiusButton.textContent.trim() : '10 miles';
  cells.push(['radius', radius]);

  // Row 3: Button text
  const buttonText = searchButton ? searchButton.textContent.trim().replace(/\s+/g, ' ') : 'Search';
  cells.push(['button', buttonText]);

  // Row 4: Action URL
  cells.push(['action', '/vacancies']);

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'job-search',
    cells,
  });

  element.replaceWith(block);
}
